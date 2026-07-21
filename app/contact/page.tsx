import { AuroraBackground } from '@/components/animations';
import { Navigation, Footer, Contact } from '@/components/sections';
import { PageTransition } from '@/components/PageTransition';

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="relative z-10" style={{ background: 'var(--color-surface-white)' }}>
        <Navigation />
        <main>
          <Contact />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
