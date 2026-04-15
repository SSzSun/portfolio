import Image from "next/image";
import pokemon_SearchPage from "@/assets/images/pokemon_Search.png";
import solidi_Thai_DashBoard from "@/assets/images/solidi_Thai_DashBoard.png";
import mylogin_jwt from "@/assets/images/mylogin_jwt.png";
import GithubIcon from "@/assets/icons/github.svg";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";

const portfolioProjects = [
    {
    company: "My Testing",
    year: "2026",
    title: "My Login with JWT",
    results: [
      { title: "Angular" },
      { title: "Tailwind" },
      { title: "Go" },
    ],
    githubLink: "https://github.com/SSzSun/mylogin-jwt",
    image: mylogin_jwt,
  },
  {
    company: "My Project",
    year: "2024",
    title: "Pokemon Search App",
    results: [
      { title: "Next.js" },
      { title: "Tailwind" },
      { title: "Css" },
    ],
    link: "https://search-pokemon-jaruphat-virid.vercel.app/",
    githubLink: "https://github.com/SSzSun/search-pokemon",
    image: pokemon_SearchPage,
  },
  {
    company: "My Testing",
    year: "2024",
    title: "Solidi Thai DashBoard",
    results: [
      { title: "React" },
      { title: "Tailwind" },
    ],
    link: "https://solidi-thai-front-end-dev.vercel.app/",
    githubLink: "https://github.com/SSzSun/SolidiThai_Front-end-Dev",
    image: solidi_Thai_DashBoard,
  }
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="pb-16 lg:py-24">
      <div className="container">
        <SectionHeader
          title="Featured Project"
          eyebrow="Real World Result"
          description="See how I transformed concepts into real-world results."
        />
        <div className="mt-10 md:mt-20 flex flex-col gap-20">
          {portfolioProjects.map((project, projectIndex) => (
            <Card
              key={project.title}
              className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky"
              style={{ top: `calc(64px + ${projectIndex * 40}px)` }}
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                <div className="lg:pb-16">
                  <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl mt-2 md:mt-5 md:text-4xl">
                    {project.title}
                  </h3>
                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {project.results.map((result) => (
                      <li
                        key={result.title}
                        className="flex gap-2 text-sm md:text-base text-white/50"
                      >
                        <CheckCircleIcon className="size-5 md:size-6" />
                        {result.title}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col md:flex-row gap-4 mt-8">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <button
                        className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 
                        rounded-xl font-semibold inline-flex items-center justify-items-center gap-2"
                      >
                        <span>View Live Site</span>
                        <ArrowUpRightIcon className="size-4" />
                      </button>
                    </a>
                  )}
                  <a href={project.githubLink} target="_blank">
                    <button
                      className="bg-gray-900 text-white h-12 w-full md:w-auto px-6 
                rounded-xl font-semibold inline-flex items-center justify-items-center gap-2" 
                    >
                      <span>GitHub Repo</span>
                      <GithubIcon className="size-4 drop-shadow-[0_0_3px_rgba(0,255,0,1)]" />
                    </button>
                  </a>
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
