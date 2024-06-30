"use client";

import { useTheme } from "next-themes";

import { IoSunnyOutline, IoLaptopOutline, IoMoonOutline } from "react-icons/io5";

import { Lazy } from "components/layout/lazy";

import { Toggle } from "../toggle";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Lazy>
      <Toggle.Root value={theme} onValueChange={setTheme}>
        <Toggle.Switch value="light">
          <IoSunnyOutline />
        </Toggle.Switch>

        <Toggle.Switch value="system">
          <IoLaptopOutline />
        </Toggle.Switch>

        <Toggle.Switch value="dark">
          <IoMoonOutline />
        </Toggle.Switch>
      </Toggle.Root>
    </Lazy>
  );
};
