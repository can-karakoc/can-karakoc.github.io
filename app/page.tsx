import { AuroraBackground } from '@/components/animations';
import {
  Navigation,
  Hero,
  Projects,
  Resume,
  Contact,
  Footer,
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
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
