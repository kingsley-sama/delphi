import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Motion";

type Facilitator = {
  name: string;
  role: string;
  credential: string;
  photo: string;
};

const facilitators: Facilitator[] = [
  {
    name: "Israel Adedoyin",
    role: "Numerical Reasoning",
    credential: "5+ Years Maths Tutor",
    photo: "/facilitators/israel-adedoyin.webp",
  },
  {
    name: "Pelumi Adebowale",
    role: "Verbal Reasoning",
    credential: "First Class English Education, UNILAG",
    photo: "/facilitators/pelumi-adebowale.webp",
  },
  {
    name: "Olawale Ogundele",
    role: "Data Interpretation",
    credential: "First Class Statistics, UNILAG",
    photo: "/facilitators/olawale-ogundele.webp",
  },
  {
    name: "Similoluwa Oshode",
    role: "Logical Reasoning",
    credential: "NHEF Scholar & First Class Civil Eng, UNILAG",
    photo: "/facilitators/similoluwa-oshode.webp",
  },
];

export function Facilitators() {
  return (
    // Transparent: the deep green field and its gridlines come from the shared
    // wrapper this sits inside, so the lines run on unbroken from the hero.
    <section className="relative pb-20 pt-14 sm:pb-28 sm:pt-20">
      <Container className="text-center">
        <Reveal>
        <h2 className="text-[38px] font-extrabold uppercase leading-[1.02] tracking-tight text-accent min-[400px]:text-[46px] sm:text-6xl lg:text-[76px]">
          Meet The Facilitators
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[17px] text-white/70 sm:text-lg">
          The bootcamp is led by instructors who teach each core area deliberately — so
          you build the skill behind the question, not just the answer to it.
        </p>
        </Reveal>
      </Container>

      {/* A filling grid rather than a scroll rail: the cards stretch to the row,
          so a tighter gap goes straight into image width. */}
      <Container>
        <RevealGroup className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
          {facilitators.map((person) => (
            <RevealItem key={person.name} className="group flex h-full flex-col text-center">
              <div className="relative aspect-[5/6] overflow-hidden rounded-[24px] bg-neutral-100 ring-2 ring-transparent transition-all duration-300 group-hover:ring-accent">
                <Image
                  src={person.photo}
                  alt={`${person.name}, ${person.role} facilitator`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 320px"
                  className="object-cover object-top grayscale transition-all duration-300 group-hover:grayscale-0"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white">{person.name}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{person.role}</p>
              <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-white/75">
                {person.credential}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
