"use client";
import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { themes } from "@/constants";
import { LuSun, LuMoon } from "react-icons/lu";
const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className=" bg-transparent border-none shadow-none w-full relative justify-end px-10 py-10 invert-colors ">
      <MenubarMenu>
        <MenubarTrigger className="border dark:border-white shadow-md dark:shadow-white rounded-full p-5  ">
          {" "}
          {mode === "light" ? <LuSun size={20} /> : <LuMoon size={20} />}{" "}
        </MenubarTrigger>
        <MenubarContent className=" mt-3 min-w-[120px] rounded border invert-colors  ">
          {themes.map((item) => (
            <MenubarItem
              key={item.value}
              className="flex items-center gap-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-white/30 px-2.5 py-2 "
              onClick={() => {
                setMode(item.value);
                if (item.value !== "system") {
                  localStorage.theme = item.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              {item.icon}
              <p
                className={`body-semibold  ${
                  mode === item.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                }  `}
              >
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
