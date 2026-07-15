import { AuroraBackground } from '@/components/animations';
import {
  Navigation,
  Hero,
  Footer,
} from '@/components/sections';
import { ProjectsWaterfall } from '@/components/sections/Projects.waterfall';

export default function Home() {
  return (
    <>
      <AuroraBackground />
      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          <ProjectsWaterfall />
        </main>
        <Footer />
      </div>
    </>
  );
}
