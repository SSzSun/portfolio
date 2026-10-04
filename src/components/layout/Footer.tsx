import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { TapeReel } from "@/components/ui/TapeReel";
import { VisitorBadge } from "./VisitorBadge";

export function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { href: site.social.github, label: "GitHub", Icon: GithubIcon },
    { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  ];

  return (
    <footer id="contact" className="border-t-2 border-charcoal bg-panel">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-static">
            {"// end of tape"}
          </p>
          <h2 className="glow mt-2 text-4xl text-crt">Let&apos;s build something.</h2>
          <a
            href={site.gmailCompose}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 text-xl text-beige underline-offset-4 hover:text-crt hover:underline"
          >
            <Mail aria-hidden="true" className="size-5" />
            Send an email
          </a>
          <CopyEmail className="mt-2" />
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <div className="flex items-center gap-3 text-crt/70">
            <TapeReel size={40} />
            <TapeReel size={40} />
          </div>
          <ul className="flex gap-3">
            {links.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-11 items-center justify-center border-2 border-charcoal text-beige transition-[transform,color] duration-200 hover:scale-[1.03] hover:border-crt hover:text-crt"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
          <VisitorBadge />
        </div>
      </div>

      <div className="border-t border-charcoal">
        <p className="container-x py-4 font-mono text-xs text-static">
          &copy; {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
