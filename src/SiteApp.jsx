import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import BookingForm from "./components/BookingForm";
import LocationMap from "./components/LocationMap";
import Footer from "./components/Footer";
import StickyContactBar from "./components/StickyContactBar";

export default function SiteApp() {
  return (
    <div className="pb-14 md:pb-0">
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <BookingForm />
      <LocationMap />
      <Footer />
      <StickyContactBar />
    </div>
  );
}
