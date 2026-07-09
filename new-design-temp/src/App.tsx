import { lazy, Suspense } from "react";
import { useLenis } from "./lib/useLenis";
import Nav from "./components/Nav";
import Hero from "./components/Hero";

// Lazy load components below the fold for better initial load performance
const About = lazy(() => import("./components/About"));
const Capabilities = lazy(() => import("./components/Capabilities"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// Smooth loading fallback with fade-in
function SectionLoader() {
  return (
    <div className="flex min-h-[20vh] items-center justify-center">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-spin rounded-full border-3 border-ink/10" />
        <div className="absolute inset-0 animate-spin rounded-full border-3 border-t-cobalt border-r-transparent border-b-transparent border-l-transparent" style={{ animationDuration: '1s' }} />
        <div className="absolute inset-0 animate-ping rounded-full border border-cobalt/20" style={{ animationDuration: '2s' }} />
      </div>
    </div>
  );
}

export default function App() {
  useLenis();

  return (
    <div className="grain relative">
      <Nav />
      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <About />
          <Capabilities />
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
