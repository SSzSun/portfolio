import Image from "next/image";
import jaruphatImage from "@/assets/images/pic_Jaruphat_Khenprom.png";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import grainImage from "@/assets/images/grain.jpg";
import StarIcon from "@/assets/icons/star.svg";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import { HeroOrbit } from "@/components/HeroOrbit";

export const HeroSection = () => {
  return (
    <div id="home" className="py-32 md:py-48 lg:py-60 relative z-0 overflow-x-clip">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{ backgroundImage: `url(${grainImage.src})` }}
        ></div>
        <div className="size-[620px] hero-ring"></div>
        <div className="size-[820px] hero-ring"></div>
        <div className="size-[1020px] hero-ring"></div>
        <div className="size-[1220px] hero-ring"></div>
        <HeroOrbit size={430} rotation={-14} shouldOrbit orbitDuration="30s" shouldSpin spinDuration="8s">
          <SparkleIcon className="size-8 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={440} rotation={79} shouldOrbit orbitDuration="32s" shouldSpin spinDuration="5s">
          <SparkleIcon className="size-5 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration="46s">
          <div className="size-2 rounded-full bg-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={530} rotation={178} shouldOrbit orbitDuration="36s"  shouldSpin spinDuration="7s">
          <SparkleIcon className="size-10 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={550} rotation={20} shouldOrbit orbitDuration="38s" shouldSpin spinDuration="3s">
          <SparkleIcon className="size-3 rounded-full text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={590} rotation={98} shouldOrbit orbitDuration="40s" shouldSpin spinDuration="9s">
          <StarIcon className="size-8 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration="42s" shouldSpin spinDuration="2s">
          <StarIcon className="size-2 rounded-full text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={710} rotation={144} shouldOrbit orbitDuration="44s" shouldSpin spinDuration="6s">
          <SparkleIcon className="size-14 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration="46s">
          <div className="size-3 rounded-full bg-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={800} rotation={-72} shouldOrbit orbitDuration="48s" shouldSpin spinDuration="4s">
          <StarIcon className="size-28 text-emerald-300" />
        </HeroOrbit>
            </div>
      <div className="container">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={jaruphatImage}
            className="size-[120px] z-10 border border-gray-800 inset-0 shadow-yellow-200/30 shadow-[0_0_20px] rounded-full"
            alt="Memoji"
          />
          <div className="bg-gray-950 border border-gray-800 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg">
            <div className="bg-green-500 size-2.5 rounded-full relative">
              <div className="bg-green-500 absolute inset-0 rounded-full animate-ping-large"></div>
            </div>
            <div className="text-sm font-medium">Avatar Jaruphat Khenprom</div>
          </div>
        </div>
        <div className="max-w-lg mx-auto">
          <h1 className="font-serif md:text-5xl text-3xl text-center mt-8 tracking-wide">
            My Portfolio
          </h1>
          <p className="mt-4 text-center text-white/60 md:text-lg">
            Hello. I am Jaruphat Khenprom : Outstanding ability Back-end In addition to
            strong technical skills, I excel in communication and collaboration within a
            team. I am enthusiastic, adaptable, open-minded, hardworking, good team
            player, capable of working effectively under pressure.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4">
          <a href="#projects" className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl z-20">
              <span className="font-semibold">Explore My Work</span>
              <ArrowDown className="size-4" />
          </a>
          <a href="/Cv_Jaruphat-Khenprom.pdf" download="CV_Jaruphat_Khenprom.pdf" className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl z-20">
            <span>📂</span>
            <span className="font-semibold">Download CV</span>
          </a>
        </div>
      </div>
    </div>
  );
};
