import { lazy, Suspense } from "react";
import { useLenis } from "./lib/useLenis";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";

// Lazy load components below the fold for better initial load performance
const About = lazy(() => import("./components/About"));
const Capabilities = lazy(() => import("./components/Capabilities"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// Simple loading fallback
function SectionLoader() {
  return (
    <div className="flex min-h-[20vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink border-t-transparent" />
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
        <Marquee />
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
