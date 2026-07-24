import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

async function getAccessToken() {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token!,
    }),
  });

  return response.json();
}

async function getNowPlaying() {
  const { access_token } = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 204 || response.status > 400) {
    return null;
  }

  return response.json();
}

async function getRecentlyPlayed() {
  const { access_token } = await getAccessToken();

  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status > 400) {
    return null;
  }

  return response.json();
}

export async function GET() {
  try {
    // First try to get currently playing
    const nowPlayingResponse = await getNowPlaying();

    if (nowPlayingResponse && nowPlayingResponse.item) {
      const isPlaying = nowPlayingResponse.is_playing;
      const title = nowPlayingResponse.item.name;
      const artist = nowPlayingResponse.item.artists.map((artist: any) => artist.name).join(', ');
      const album = nowPlayingResponse.item.album.name;
      const albumImageUrl = nowPlayingResponse.item.album.images[0]?.url;
      const songUrl = nowPlayingResponse.item.external_urls.spotify;

      return NextResponse.json({
        isPlaying,
        title,
        artist,
        album,
        albumImageUrl,
        songUrl,
      });
    }

    // If nothing is playing, get the last played track
    const recentlyPlayedResponse = await getRecentlyPlayed();

    if (recentlyPlayedResponse && recentlyPlayedResponse.items && recentlyPlayedResponse.items.length > 0) {
      const track = recentlyPlayedResponse.items[0].track;
      const title = track.name;
      const artist = track.artists.map((artist: any) => artist.name).join(', ');
      const album = track.album.name;
      const albumImageUrl = track.album.images[0]?.url;
      const songUrl = track.external_urls.spotify;

      return NextResponse.json({
        isPlaying: false,
        title,
        artist,
        album,
        albumImageUrl,
        songUrl,
      });
    }

    return NextResponse.json({ isPlaying: false });
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json({ isPlaying: false, error: 'Failed to fetch data' });
  }
}
