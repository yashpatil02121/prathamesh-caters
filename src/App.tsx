import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/home/Hero";
import { Services } from "./components/home/Services";
import { Menu } from "./components/home/Menu";
import { About } from "./components/home/About";

function App() {
  return (
    <div className="min-h-screen bg-page text-body">
      <Navbar />

      <main>
        <Hero />

        <Menu />

        <Services />

        <About />
      </main>

      <Footer />
    </div>
  );
}

export default App;