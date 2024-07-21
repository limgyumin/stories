import type { ReactNode } from "react";

import { FaLinkedin } from "react-icons/fa6";
import { IoLogoGithub, IoMailSharp } from "react-icons/io5";

export type Platform = Readonly<{
  name: string;
  title: string;
  url: string;
  icon: ReactNode;
}>;

export const PLATFORMS: readonly Platform[] = [
  {
    name: "github",
    title: "Github",
    url: "https://github.com/limgyumin",
    icon: <IoLogoGithub />,
  },
  {
    name: "linkedin",
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/milimgyu/",
    icon: <FaLinkedin />,
  },
  {
    name: "mail",
    title: "Mail",
    url: "mailto:dev.limgyumin@gmail.com",
    icon: <IoMailSharp />,
  },
];
