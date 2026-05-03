import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import {
  Home,
  Info,
  Shield,
  Users,
  FileText,
  FolderOpen,
  Phone,
} from "lucide-react";

const navItems = [
  { key: "home", href: "/", icon: Home },
  { key: "about", href: "/about", icon: Info },
  { key: "governance", href: "/governance", icon: Shield },
  { key: "beneficiaries", href: "/beneficiaries", icon: Users },
  { key: "reports", href: "/reports", icon: FileText },
  { key: "projects", href: "/projects", icon: FolderOpen },
  { key: "contact", href: "/contact", icon: Phone },
] as const;

const BASE_BOTTOM_OFFSET = 12;

const getViewportBottomOffset = () => {
  if (typeof window === "undefined") return BASE_BOTTOM_OFFSET;

  const viewport = window.visualViewport;
  if (!viewport) return BASE_BOTTOM_OFFSET;

  const dynamicInset = Math.max(
    0,
    window.innerHeight - (viewport.height + viewport.offsetTop)
  );

  return Math.round(BASE_BOTTOM_OFFSET + dynamicInset);
};

const MobileBottomNav = () => {
  const { lang, t } = useLang();
  const location = useLocation();
  const [bottomOffset, setBottomOffset] = useState(BASE_BOTTOM_OFFSET);

  useEffect(() => {
    let rafId: number | null = null;

    const syncOffset = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setBottomOffset(getViewportBottomOffset());
      });
    };

    syncOffset();

    const viewport = window.visualViewport;
    viewport?.addEventListener("resize", syncOffset);
    viewport?.addEventListener("scroll", syncOffset);
    window.addEventListener("resize", syncOffset);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      viewport?.removeEventListener("resize", syncOffset);
      viewport?.removeEventListener("scroll", syncOffset);
      window.removeEventListener("resize", syncOffset);
    };
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav
      className="fixed left-1/2 -translate-x-1/2 z-[140] lg:hidden w-[min(92vw,32rem)]"
      style={{ bottom: `${bottomOffset}px` }}
    >
      <div className="w-full bg-card/95 backdrop-blur-2xl rounded-3xl shadow-card border border-border">
        <div className="flex items-center justify-between px-3 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const label = t.nav[item.key as keyof typeof t.nav][lang];

            return (
              <Link
                key={item.href}
                to={item.href}
                aria-label={label}
                className="relative flex-1 flex flex-col items-center gap-1.5 min-w-0 px-1 group"
              >
                <div className="relative flex items-center justify-center">
                  {active && (
                    <motion.div
                      layoutId="mobileActiveTab"
                      className="absolute w-11 h-11 rounded-full gradient-primary shadow-lg"
                      transition={{ type: "tween", duration: 0.18, ease: "easeOut" }}
                    />
                  )}
                  <div
                    className={`relative z-10 w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 ${
                      active
                        ? "text-primary-foreground"
                        : "text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"
                    }`}
                  >
                    <Icon size={19} strokeWidth={active ? 2.5 : 2} />
                  </div>
                </div>

                <span
                  className={`text-[9px] leading-tight font-extrabold max-w-[48px] text-center whitespace-normal transition-colors duration-200 ${
                    active ? "text-primary" : "text-foreground"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileBottomNav;

