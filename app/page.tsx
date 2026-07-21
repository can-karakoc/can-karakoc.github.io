import { AuroraBackground } from '@/components/animations';
import {
  Navigation,
  Hero,
  Footer,
  Projects,
} from '@/components/sections';
import { PageTransition } from '@/components/PageTransition';

export default function Home() {
  return (
    <>
      <AuroraBackground />
      <PageTransition>
        <div className="relative z-10">
          <Navigation />
          <main>
            <Hero />
            <Projects />
          </main>
          <Footer />
        </div>
      </PageTransition>
    </>
  );
}
