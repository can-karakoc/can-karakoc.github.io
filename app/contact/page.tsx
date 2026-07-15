import { AuroraBackground } from '@/components/animations';
import { Navigation, Footer, Contact } from '@/components/sections';

export default function ContactPage() {
  return (
    <>
      <AuroraBackground />
      <div className="relative z-10">
        <Navigation />
        <main>
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
