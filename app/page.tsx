import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import Collection from "@/components/sections/Collection";
import Heritage from "@/components/sections/Heritage";
import Keeper from "@/components/sections/Keeper";
import TastingNotes from "@/components/sections/TastingNotes";
import CellarSociety from "@/components/sections/CellarSociety";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Process />
      <Collection />
      <Heritage />
      <Keeper />
      <TastingNotes />
      <CellarSociety />
      <Footer />
    </div>
  );
}
