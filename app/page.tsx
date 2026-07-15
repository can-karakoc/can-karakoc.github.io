import { AuroraBackground, ScrollTransition } from '@/components/animations';
import {
  Navigation,
  Hero,
  Footer,
  Projects,
} from '@/components/sections';

export default function Home() {
  return (
    <>
      <AuroraBackground />
      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          <ScrollTransition variant="waves" />
          <Projects />
          <ScrollTransition variant="fade" />
        </main>
        <Footer />
      </div>
    </>
  );
}
