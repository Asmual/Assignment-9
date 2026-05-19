import Hero from "@/components/home/Hero";
import WhyChoose from "@/components/home/WhyChoose";
import TopDoctors from "@/components/home/TopDoctors";
import ReviewsFeedback from "@/components/home/ReviewsFeedback ";

export default function Home() {
  return (
    <main>
      <Hero/>
      <TopDoctors/>
      <WhyChoose/>
      <ReviewsFeedback/>
    </main>
  );
}
