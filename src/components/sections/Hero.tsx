import { Download, Mail } from "lucide-react";
import { TypewriterText } from "@/components/effects/TypewriterText";
import { buttonClass } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { TapeReel } from "@/components/ui/TapeReel";
import { site } from "@/lib/site";
import { HeroSummary } from "./HeroSummary";
import { ProfilePhoto } from "./ProfilePhoto";

export function Hero({ summary }: { summary: string }) {
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
          <HeroSummary summary={summary} />

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.resume} className={buttonClass("primary")}>
              <Download aria-hidden="true" className="size-5" /> Download resume
            </a>
            <a
              href={site.gmailCompose}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("ghost")}
            >
              <Mail aria-hidden="true" className="size-5" /> Contact
            </a>
          </div>
          <CopyEmail className="mt-4" />

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

        {/* Cassette-style profile frame. Click the photo to flip sides. */}
        <div className="pixel-border mx-auto w-full max-w-sm rounded-[0.5rem] bg-beige p-4 text-charcoal">
          <div className="flex items-center justify-between font-mono text-xs uppercase">
            <span>Side XII</span>
            <span>C-1203</span>
          </div>
          <div className="mt-3 aspect-[4/5] overflow-hidden rounded-[0.5rem] border-2 border-charcoal bg-navy">
            <ProfilePhoto photos={site.avatars} name={site.name} />
          </div>
          <div className="mt-4 flex items-center justify-around rounded-[0.5rem] bg-charcoal py-3 text-beige">
            <TapeReel size={44} />
            <span className="font-mono text-xs uppercase tracking-widest">{site.nickname}.jrp</span>
            <TapeReel size={44} />
          </div>
        </div>
      </div>
    </section>
  );
}
