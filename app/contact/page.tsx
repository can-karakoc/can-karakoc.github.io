import { AuroraBackground } from '@/components/animations';
import { Navigation, Footer, Contact } from '@/components/sections';
import { PageTransition } from '@/components/PageTransition';

export default function ContactPage() {
  return (
    <>
      <AuroraBackground />
      <PageTransition>
        <div className="relative z-10">
          <Navigation />
          <main>
            <Contact />
          </main>
          <Footer />
        </div>
      </PageTransition>
    </>
  );
}
