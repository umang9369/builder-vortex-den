import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const LOGO_URL = "https://cdn.builder.io/api/v1/image/assets%2F823f55bf46824ad3a2e7751fa8fe2b67%2F73baba9a7b7b43458e9b2d2dd4724e46?format=webp&width=800";

const nav = [
  { to: "/prices", label: "फसल की कीमतें" },
  { to: "/weather", label: "मौसम की जानकारी" },
  { to: "/schemes", label: "सरकारी योजनाएं" },
  { to: "/advice", label: "कृषि सलाह" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2">
          <img src={LOGO_URL} alt="Kissan logo" className="h-8 w-8 rounded-md object-contain" width={32} height={32} />
          <span className="text-xl font-extrabold tracking-tight text-primary">Kissan</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`}
            >
              {item.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </nav>
        <button
          aria-label="Open navigation menu"
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-border bg-white/70 dark:bg-white/10 text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-white/80 dark:bg-black/40 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 grid gap-3">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `block text-base py-1 ${isActive ? "text-primary" : "text-foreground"}`}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="py-2"><ThemeToggle /></div>
          </div>
        </div>
      )}
    </header>
  );
}
