export const site = {
  name: "Jaruphat Khenprom",
  nickname: "Sun",
  role: "Full-Stack Developer",
  summary:
    "Outstanding ability in Front-end and Back-end. In addition to strong technical skills, I excel in communication and collaboration within a team. I am enthusiastic, adaptable, open-minded, hardworking, a good team player, and capable of working effectively under pressure.",
  email: "jaruphat.kp@gmail.com",
  // Opens Gmail's compose window; friendlier than mailto for most visitors.
  gmailCompose: "https://mail.google.com/mail/?view=cm&fs=1&to=jaruphat.kp@gmail.com",
  resume: "/resume.pdf",
  resumeFileName: "Resume_Jaruphat.pdf",
  // Profile photos; clicking the photo toggles between the two.
  avatars: ["/profile.webp", "/profile_1.webp"],
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
