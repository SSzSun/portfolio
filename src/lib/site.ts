export const site = {
  name: "Jaruphat Khenprom",
  nickname: "Sun",
  role: "Full-Stack Developer",
  summary:
    "Outstanding ability in Front-end and Back-end. In addition to strong technical skills, I excel in communication and collaboration within a team. I am enthusiastic, adaptable, open-minded, hardworking, a good team player, and capable of working effectively under pressure.",
  email: "jaruphat.kp@gmail.com",
  resume: "/resume.pdf",
  // Replace with /profile.jpg once the photo is added to /public.
  avatar: null as string | null,
  social: {
    github: "https://github.com/SSzSun",
    linkedin: "https://www.linkedin.com/in/jaruphat-khenprom",
  },
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;
