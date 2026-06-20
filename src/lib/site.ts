export const programs = [
  {
    name: "Delphi Prep",
    href: "/prep",
    blurb: "Exam preparation and test readiness for every milestone.",
  },
  {
    name: "Delphi Academics",
    href: "/academics",
    blurb: "School-aligned tutoring across subjects and curricula.",
  },
  {
    name: "Delphi Upskill",
    href: "/upskill",
    blurb: "Practical, career-ready skills for the modern world.",
  },
  {
    name: "Delphi Career",
    href: "/career",
    blurb: "Guidance and coaching to launch the next chapter.",
  },
];

export const regions = [
  { name: "Nigeria", flag: "🇳🇬", adjective: "Nigerian" },
  { name: "United Kingdom", flag: "🇬🇧", adjective: "British" },
  { name: "United States", flag: "🇺🇸", adjective: "American" },
  { name: "Canada", flag: "🇨🇦", adjective: "Canadian" },
];

type CurriculumEntry = {
  levels: string[];
  exams: string[];
  subjects: string[];
};

export const curriculum: Record<string, CurriculumEntry> = {
  Nigeria: {
    levels: [
      "Primary 4-6",
      "Junior secondary",
      "Senior secondary",
      "College/University",
      "Working professionals",
    ],
    exams: ["Common Entrance", "BECE", "WAEC / NECO", "JAMB (UTME)"],
    subjects: ["Mathematics", "English", "Sciences", "Social Studies"],
  },
  "United Kingdom": {
    levels: ["Key Stage 2", "Key Stage 3", "GCSE", "A-Level", "University"],
    exams: ["SATs", "GCSE", "A-Level", "IELTS"],
    subjects: ["Maths", "English", "Sciences", "Humanities"],
  },
  "United States": {
    levels: ["Elementary", "Middle School", "High School", "College", "Professional"],
    exams: ["SAT", "ACT", "AP Exams", "GRE"],
    subjects: ["Math", "English", "Science", "Social Studies"],
  },
  Canada: {
    levels: ["Elementary", "Middle School", "High School", "University", "Professional"],
    exams: ["Provincial Exams", "University Entrance", "IELTS", "CELPIP"],
    subjects: ["Math", "English", "French", "Sciences"],
  },
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", children: programs },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const contact = {
  email: "info@delphieduhub.com",
  phone: "+234 916 754 2539",
  whatsapp: "https://wa.me/2349167542539",
};
