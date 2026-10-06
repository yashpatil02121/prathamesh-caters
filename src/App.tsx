import { MenuSelectionProvider } from "./context/MenuSelectionProvider";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { FloatingActions } from "./components/layout/FloatingActions";
import { Hero } from "./components/home/Hero";
import { Services } from "./components/home/Services";
import { Menu } from "./components/home/Menu";
import { Occasions } from "./components/home/Occasions";
import { Process } from "./components/home/Process";
import { Gallery } from "./components/home/Gallery";
import { About } from "./components/home/About";
import { Faq } from "./components/home/Faq";
import { Contact } from "./components/home/Contact";

function App() {
  return (
    <MenuSelectionProvider>
      <div className="min-h-screen bg-page text-body">
        <a
          href="#menu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to menu
        </a>

        <Navbar />

        <main>
          <Hero />

          <Menu />

          <Services />

          <Occasions />

          <Process />

          <Gallery />

          <About />

          <Faq />

          <Contact />
        </main>

        <div className="h-16 bg-sand/50" />

        <Footer />

        <FloatingActions />
      </div>
    </MenuSelectionProvider>
  );
}

export default App;
