import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted/60 transition-colors"
    >
      <Sun className={`h-4 w-4 ${isDark ? "opacity-40" : "text-amber-500"}`} />
      <Moon className={`h-4 w-4 ${isDark ? "text-sky-400" : "opacity-40"}`} />
    </button>
  );
}
