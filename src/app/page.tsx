import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import AdsBanner from "@/components/AdsBanner";

export default function Home() {
  return (
    <main>
      {/* <div className="w-screen h-screen bg-[#000235]"></div> */}
      <AdsBanner />
      <Hero />
      <AboutUs />

    </main>
  );
}
