import { Navigation, Footer } from '@/components/sections';
import { AuroraBackground } from '@/components/animations';
import { GlassCard } from '@/components/ui';

export default function About() {
  return (
    <>
      <AuroraBackground />
      <div className="relative z-10">
        <Navigation />
        <main className="min-h-[60vh] px-6 py-20">
          <div className="max-w-[800px] mx-auto">
            <h1
              className="font-extrabold leading-tight mb-6"
              style={{
                fontSize: 'clamp(38px, 6vw, 56px)',
                letterSpacing: '-0.035em',
                color: 'var(--color-ink)',
              }}
            >
              About Me
            </h1>

            <GlassCard className="p-8 mb-6">
              <p
                className="text-lg leading-relaxed mb-4"
                style={{
                  color: 'var(--color-ink-muted)',
                }}
              >
                This is a placeholder About page. Add your story, background,
                interests, and philosophy here.
              </p>

              <p
                className="text-lg leading-relaxed"
                style={{
                  color: 'var(--color-ink-muted)',
                }}
              >
                Content coming soon!
              </p>
            </GlassCard>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
