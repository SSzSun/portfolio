"use client"
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import JavascriptIcon from "@/assets/icons/square-js.svg";
import GithubIcon from "@/assets/icons/github.svg";
import CssIcon from "@/assets/icons/css3.svg";
import HtmlIcon from "@/assets/icons/html5.svg";
import ReactIcon from "@/assets/icons/react.svg";
import NodeIcon from "@/assets/icons/nodejs.svg";
import AngularIcon from "@/assets/icons/angular.svg";
import NextjsIcon from "@/assets/icons/nextjs.svg";
import TypescriptIcon from "@/assets/icons/typescript.svg";
import TailwindIcon from "@/assets/icons/tailwind.svg";
import NuxtjsIcon from "@/assets/icons/nuxtjs.svg";
import VuejsIcon from "@/assets/icons/vuejs.svg";
import PythonIcon from "@/assets/icons/python.svg";
import DockerIcon from "@/assets/icons/docker.svg";
import NestjsIcon from "@/assets/icons/nestjs.svg";
import PostgreIcon from "@/assets/icons/postgre.svg";
import MongoIcon from "@/assets/icons/mongo.svg";
import PrismaIcon from "@/assets/icons/prisma.svg";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/ToolboxItems";
import { motion } from "framer-motion";
import { useRef } from "react";

const toolboxItems = [
    {
    title: "Angular",
    iconType: AngularIcon,
  },
  {
    title: "javascript",
    iconType: JavascriptIcon,
  },
  {
    title: "Github",
    iconType: GithubIcon,
  },
  {
    title: "Node.js",
    iconType: NodeIcon,
  },
  {
    title: "React",
    iconType: ReactIcon,
  },
  {
    title: "Next.js",
    iconType: NextjsIcon,
  },
  {
    title: "TypeScript",
    iconType: TypescriptIcon,
  },
  {
    title: "Tailwind CSS",
    iconType: TailwindIcon,
  },
  {
    title: "Nuxt.js",
    iconType: NuxtjsIcon,
  },
  {
    title: "Vue.js",
    iconType: VuejsIcon,
  },
  {
    title: "Python",
    iconType: PythonIcon,
  },
  {
    title: "Docker",
    iconType: DockerIcon,
  },
  {
    title: "Nest.js",
    iconType: NestjsIcon,
  },
  {
    title: "PostgreSQL",
    iconType: PostgreIcon,
  },
  {
    title: "MongoDB",
    iconType: MongoIcon,
  },
  {
    title: "Prisma",
    iconType: PrismaIcon,
  },
  {
    title: "CSS",
    iconType: CssIcon,
  },
  {
    title: "HTML",
    iconType: HtmlIcon,
  },
];

const hobbies = [
  {
    title: "Badminton",
    emoji: "🏸",
    left: "55%",
    top: "10%",
  },
  {
    title: "Running",
    emoji: "🏃",
    left: "75%",
    top: "15%",
  },
  {
    title: "Read Thriller Books",
    emoji: "📚",
    left: "20%",
    top: "75%",
  },
  {
    title: "Learning Finance",
    emoji: "📚",
    left: "20%",
    top: "5%",
  },
  {
    title: "Music",
    emoji: "🎵",
    left: "50%",
    top: "47%",
  },
  {
    title: "Fitness",
    emoji: "💪",
    left: "65%",
    top: "60%",
  },
  {
    title: "Completionist Gamer",
    emoji: "🎮",
    left: "30%",
    top: "25%",
  },
  {
    title: "Cafe Coffee",
    emoji: "☕",
    left: "10%",
    top: "55%",
  },
];

export const AboutSection = () => {
  const constraintRef = useRef(null);
  return (
    <div id="about" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="Who I Am"
          description="A passionate developer with a love for building amazing web experiences and continuous learning."
        />
        <div className="mt-20 flex flex-col gap-8">
          <Card className="h-[320px] md:col-span-3">
            <CardHeader
              title="My Toolbox"
              description="Tools I use to build things"
              className="px-6 pt-6"
            />
            <ToolboxItems
              items={toolboxItems}
              itemsWrapperClassName="animate-move-left [animation-duration:30s]"
            />
            <ToolboxItems
              items={toolboxItems}
              className="mt-6"
              itemsWrapperClassName="animate-move-right [animation-duration:15s]"
            />
          </Card>
          <Card className="h-[320px] p-0 flex flex-col col-span-3">
            <CardHeader
              title="My Hobbies"
              description="Things I enjoy doing in my free time"
              className="px-6 py-6"
            />
            <div className="relative flex-1" ref={constraintRef}>
              {hobbies.map((hobby) => (
                <motion.div
                  key={hobby.title}
                  className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute"
                  style={{ left: hobby.left, top: hobby.top }}
                  drag
                  dragConstraints={constraintRef}
                >
                  <span className="font-medium text-gray-950">{hobby.title}</span>
                  <span>{hobby.emoji}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
