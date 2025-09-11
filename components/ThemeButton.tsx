"use client";

import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  return theme ? (
    <Button
      type="button"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      variant="ghost"
      size="icon"
      className="fixed rounded-full top-6 right-6"
      title={theme === "light" ? "Dark mode" : "Light mode"}
    >
      {theme === "light" ? (
        <Moon className="size-6" fill="black" />
      ) : (
        <Sun className="size-6" fill="#FFD700" />
      )}
    </Button>
  ) : null;
}
