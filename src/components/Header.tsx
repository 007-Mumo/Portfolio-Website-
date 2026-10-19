import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "HOME", to: "/" },
  { label: "ABOUT", to: "/about" },
  { label: "PROJECTS", to: "/projects" },
  { label: "GET IN TOUCH", to: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background border-b border-separator">
      <div className="container-wide flex items-center justify-between h-16 md:h-20">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          aria-label="BMM — Home"
          className="flex items-center"
        >
          <span className="font-display font-black text-xl border border-primary/60 text-foreground px-3 py-2 tracking-tight">
            {site.monogram}
            <span className="text-primary">.</span>
          </span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-7 lg:gap-9"
          aria-label="Main"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `font-mono text-[11px] py-2 transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              {item.label}
              {item.to === "/contact" && (
                <ArrowUpRight size={13} className="inline ml-2" />
              )}
            </NavLink>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile"
          className="md:hidden border-t border-border bg-background container-wide py-6 flex flex-col gap-2"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setOpen(false)}
              className={`font-mono text-sm py-3 hover:text-primary ${
                location.pathname === item.to
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}