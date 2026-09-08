import { Hero } from "@/components/home/Hero";
import { CoreServices } from "@/components/home/CoreServices";
import { ComprehensiveServices } from "@/components/sections/ComprehensiveServices";
import { LearningSupport } from "@/components/home/LearningSupport";
import { SmarterExperience } from "@/components/home/SmarterExperience";
import { Curriculum } from "@/components/home/Curriculum";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { BootcampPromo } from "@/components/BootcampPromo";

export default function Home() {
  return (
    <>
      <Hero />
      <CoreServices />
      <ComprehensiveServices />
      <LearningSupport />
      <SmarterExperience />
      <Curriculum />
      <Testimonials />
      <Faq />
      <Cta />
      <BootcampPromo />
    </>
  );
}
