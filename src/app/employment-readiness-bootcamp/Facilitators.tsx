import Image from "next/image";
import { User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Motion";
import {
  FacebookIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/ui/SocialIcons";

type Facilitator = {
  name: string;
  role: string;
  /** Drop a file in /public/facilitators and point here; omit for the fallback tile. */
  photo?: string;
  socials?: { facebook?: string; x?: string; linkedin?: string };
};

// PLACEHOLDER ROSTER — the roles are real, the names and photos are not. The
// photos are borrowed from the hero's avatar stack (the portrait-orientation
// ones, which crop cleanly into 4:5); swap all of this for the real
// facilitators and their headshots before launch.
const facilitators: Facilitator[] = [
  {
    name: "Facilitator one",
    role: "Numerical / Quantitative Reasoning",
    photo: "/student_avatars/31e5e75ccce0ff3b328f2dfe633a3f59b5c87078.jpg",
  },
  {
    name: "Facilitator two",
    role: "Verbal Reasoning",
    photo: "/student_avatars/b3e0541217db95984a1cece4123eeabb514b9d10.jpg",
  },
  {
    name: "Facilitator three",
    role: "Logical / Abstract Reasoning",
    photo: "/student_avatars/7f3ca6b90540dadaea9991e9ef4ad4e684584024.jpg",
  },
  {
    name: "Facilitator four",
    role: "Data Interpretation & Analysis",
    photo: "/student_avatars/34ad4bd22ff10216ce5883a5f79abe651412a5a4.jpg",
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
            <RevealItem key={person.name} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-neutral-100 ring-2 ring-transparent transition-all duration-300 group-hover:ring-accent">
                {person.photo ? (
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 320px"
                    className="object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-neutral-300">
                    <User className="h-16 w-16" strokeWidth={1.25} />
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white">{person.name}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{person.role}</p>

              {person.socials && (
                <div className="mt-3 flex gap-3">
                  {person.socials.facebook && (
                    <a
                      href={person.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} on Facebook`}
                      className="text-white/50 transition-colors hover:text-accent"
                    >
                      <FacebookIcon className="h-4 w-4" />
                    </a>
                  )}
                  {person.socials.x && (
                    <a
                      href={person.socials.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} on X`}
                      className="text-white/50 transition-colors hover:text-accent"
                    >
                      <XIcon className="h-4 w-4" />
                    </a>
                  )}
                  {person.socials.linkedin && (
                    <a
                      href={person.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} on LinkedIn`}
                      className="text-white/50 transition-colors hover:text-accent"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
