import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { FloorShow } from "@/components/site/FloorShow";
import { SetReel } from "@/components/site/SetReel";
import { About } from "@/components/site/About";
import { Packages } from "@/components/site/Packages";
import { BookingForm } from "@/components/site/BookingForm";
import { Footer } from "@/components/site/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Marquee />
      <FloorShow />
      <SetReel />
      <About />
      <Packages />
      <BookingForm />
      <Footer />
    </main>
  );
}
