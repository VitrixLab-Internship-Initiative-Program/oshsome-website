import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { brand } from "../mock";
import { Button } from "../components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../components/ui/navigation-menu";
import { Menu } from "lucide-react";

export const SiteHeader = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItem = (to, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 text-sm rounded-md transition-colors ${
          isActive || location.pathname === to
            ? "text-white bg-foreground/90"
            : "text-foreground/80 hover:text-foreground"
        }`
      }
      onClick={() => setOpen(false)}
    >
      {label}
    </NavLink>
  );

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl border-b border-border bg-background/60"
      style={{ fontFamily: brand.fonts.body }}
    >
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-md"
              style={{ backgroundColor: brand.colors.primary }}
            />
            <div className="text-base font-semibold tracking-wide" style={{ color: brand.colors.slate }}>
              {brand.name}
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>{navItem("/", "Home")}</NavigationMenuItem>
                <NavigationMenuItem>{navItem("/services", "Services")}</NavigationMenuItem>
                <NavigationMenuItem>{navItem("/module/wem", "Module 1 – WEM")}</NavigationMenuItem>
                <NavigationMenuItem>{navItem("/about", "About")}</NavigationMenuItem>
                <NavigationMenuItem>{navItem("/contact", "Contact")}</NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button
              className="ml-2"
              style={{ backgroundColor: brand.colors.primary, color: brand.colors.white }}
              onClick={() => navigate("/contact")}
            >
              Request Training Proposal
            </Button>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 border border-border"
            aria-label="Open menu"
            onClick={() => setOpen((o) => !o)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 animate-accordion-down">
            <div className="flex flex-col gap-2">
              {navItem("/", "Home")}
              {navItem("/services", "Services")}
              {navItem("/module/wem", "Module 1 – WEM")}
              {navItem("/about", "About")}
              {navItem("/contact", "Contact")}
              <Button
                className="mt-2"
                style={{ backgroundColor: brand.colors.primary, color: brand.colors.white }}
                onClick={() => {
                  navigate("/contact");
                  setOpen(false);
                }}
              >
                Request Proposal
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
