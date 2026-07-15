import { AuroraBackground } from '@/components/animations';
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
          <Projects />
        </main>
        <Footer />
      </div>
    </>
  );
}
