import { PageHero } from "@/components/sections/PageHero";
import { ImageText } from "@/components/sections/ImageText";
import { ValueGrid } from "@/components/sections/ValueGrid";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import type { Program } from "@/lib/programs";

export function ProgramTemplate({ program }: { program: Program }) {
  return (
    <>
      <PageHero
        badge={program.badge}
        title={program.hero}
        subtitle={program.heroSub}
        cta={{ label: "Book a Free Call", href: "/contact" }}
        image={program.heroImage}
        imageAlt={program.heroImageAlt}
      />
      <ImageText
        badge="Overview"
        title={program.overviewTitle}
        body={program.overviewBody}
        bullets={program.overviewBullets}
        image={program.image}
        imageAlt={program.name}
      />
      <ValueGrid
        badge="Program Highlights"
        title={program.featuresTitle}
        subtitle={program.featuresSub}
        values={program.features}
        columns={4}
      />
      <Process />
      <Faq items={program.faqs} showImage={false} />
      <Cta />
    </>
  );
}
