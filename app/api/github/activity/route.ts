import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'can-karakoc';

async function getGitHubStats() {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  try {
    const eventsRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`,
      { headers, next: { revalidate: 300 } }
    );

    if (!eventsRes.ok) {
      throw new Error('Failed to fetch events');
    }

    const events = await eventsRes.json();

    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`,
      { headers, next: { revalidate: 300 } }
    );

    const repos = reposRes.ok ? await reposRes.json() : [];

    // Build daily contribution map for last 12 weeks
    const contributionsByDate: Record<string, number> = {};
    const now = new Date();
    const twelveWeeksAgo = new Date(now.getTime() - 12 * 7 * 24 * 60 * 60 * 1000);

    events.forEach((event: any) => {
      const eventDate = new Date(event.created_at);
      if (eventDate > twelveWeeksAgo) {
        const dateKey = eventDate.toISOString().split('T')[0];
        contributionsByDate[dateKey] = (contributionsByDate[dateKey] || 0) + 1;
      }
    });

    // Calculate stats
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const commitsThisWeek = events.filter((event: any) => {
      if (event.type !== 'PushEvent') return false;
      return new Date(event.created_at) > weekAgo;
    }).length;

    const activeDaysSet = new Set(
      events
        .filter((event: any) => new Date(event.created_at) > weekAgo)
        .map((event: any) => new Date(event.created_at).toDateString())
    );
    const activeDays = activeDaysSet.size;

    // Calculate current streak
    let currentStreak = 0;
    const sortedDates = events
      .map((e: any) => new Date(e.created_at).toDateString())
      .filter((date: string, index: number, arr: string[]) => arr.indexOf(date) === index)
      .sort((a: string, b: string) => new Date(b).getTime() - new Date(a).getTime());

    let checkDate = new Date();
    for (const dateStr of sortedDates) {
      const eventDate = new Date(dateStr);
      const diffDays = Math.floor((checkDate.getTime() - eventDate.getTime()) / (24 * 60 * 60 * 1000));

      if (diffDays <= 1) {
        currentStreak++;
        checkDate = eventDate;
      } else {
        break;
      }
    }

    const languageCounts: Record<string, number> = {};
    repos.forEach((repo: any) => {
      if (repo.language && !repo.fork) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(languageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([lang]) => lang);

    const lastEvent = events[0];
    const lastActive = lastEvent ? new Date(lastEvent.created_at).toISOString() : null;

    // Calculate total contributions in last 12 weeks
    const totalContributions = Object.values(contributionsByDate).reduce((sum, count) => sum + count, 0);

    return {
      commitsThisWeek,
      activeDays,
      currentStreak,
      topLanguages,
      lastActive,
      contributionsByDate,
      totalContributions,
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}

export async function GET() {
  try {
    const stats = await getGitHubStats();

    if (!stats) {
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error in GitHub activity API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
