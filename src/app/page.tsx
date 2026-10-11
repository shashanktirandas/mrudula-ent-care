import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import CareFinder from "@/components/home/CareFinder";
import Services from "@/components/home/Services";
import Doctor from "@/components/home/Doctor";
import CareJourney from "@/components/home/CareJourney";
import Diagnostics from "@/components/home/Diagnostics";
import Emergency from "@/components/home/Emergency";
import Reviews from "@/components/home/Reviews";
import Guides from "@/components/home/Guides";
import FAQ from "@/components/home/FAQ";
import BookingCTA from "@/components/home/BookingCTA";
import Location from "@/components/home/Location";
import ClinicStructuredData from "@/components/seo/ClinicStructuredData";

export default function Home() {
  return (
    <>
    <ClinicStructuredData />
      <Navbar />

      <main>
        <Hero />

        <TrustStrip />

        <CareFinder />

        <Services />

        <Doctor />

        <CareJourney />

        <Diagnostics />

        <Emergency />

        <Reviews />

        <Guides />

        <FAQ />

        <BookingCTA />

        <Location />
      </main>

      <Footer />
    </>
  );
}