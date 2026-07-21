import { AuroraBackground } from '@/components/animations';
import { Navigation, Footer } from '@/components/sections';
import { ProjectsPage } from '@/components/sections/ProjectsPage';
import { PageTransition } from '@/components/PageTransition';

export default function Projects() {
  return (
    <>
      <AuroraBackground />
      <PageTransition>
        <div className="relative z-10">
          <Navigation />
          <main>
            <ProjectsPage />
          </main>
          <Footer />
        </div>
      </PageTransition>
    </>
  );
}
