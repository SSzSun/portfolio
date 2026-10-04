import { Download, Mail } from "lucide-react";
import { TypewriterText } from "@/components/effects/TypewriterText";
import { Reveal } from "@/components/effects/Reveal";
import { buttonClass } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { TapeReel } from "@/components/ui/TapeReel";
import { site } from "@/lib/site";

export function Hero() {
  const initials = site.name
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-x grid items-center gap-12 md:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-static">
            [track 01] / boot sequence
          </p>
          <h1 id="about-title" className="glow mt-3 text-5xl leading-none text-crt sm:text-7xl">
            <TypewriterText text={site.name} />
          </h1>
          <p className="mt-3 text-2xl text-amber">
            {site.role} <span className="text-static">a.k.a.</span> {site.nickname}
          </p>
          <Reveal>
            <p className="mt-6 max-w-[65ch] text-xl text-beige">{site.summary}</p>
          </Reveal>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.resume} download className={buttonClass("primary")}>
              <Download aria-hidden="true" className="size-5" /> Download resume
            </a>
            <a href={`mailto:${site.email}`} className={buttonClass("ghost")}>
              <Mail aria-hidden="true" className="size-5" /> Contact
            </a>
          </div>

          <ul className="mt-6 flex gap-4">
            <li>
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-beige hover:text-crt"
              >
                <GithubIcon /> GitHub
              </a>
            </li>
            <li>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-beige hover:text-crt"
              >
                <LinkedinIcon /> LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Cassette-style profile frame. Photo slot until site.avatar is set. */}
        <div className="pixel-border mx-auto w-full max-w-sm rounded-[0.5rem] bg-beige p-4 text-charcoal">
          <div className="flex items-center justify-between font-mono text-xs uppercase">
            <span>Side A</span>
            <span>C-90</span>
          </div>
          <div className="mt-3 aspect-square overflow-hidden rounded-[0.5rem] border-2 border-charcoal bg-navy">
            {site.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={site.avatar} alt={site.name} className="size-full object-cover" />
            ) : (
              <div className="flex size-full items-center justify-center">
                <span aria-hidden="true" className="glow text-8xl text-crt">
                  {initials}
                </span>
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center justify-around rounded-[0.5rem] bg-charcoal py-3 text-beige">
            <TapeReel size={44} />
            <span className="font-mono text-xs uppercase tracking-widest">{site.nickname}.mix</span>
            <TapeReel size={44} />
          </div>
        </div>
      </div>
    </section>
  );
}
