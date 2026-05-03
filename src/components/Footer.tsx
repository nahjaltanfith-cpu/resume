import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { Mail, MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useDynamicContent } from "@/hooks/useDynamicContent";

const Footer = () => {
  const { lang, t } = useLang();
  const { logoUrl: logo, contactEmail, contactLocationAr, contactLocationEn } = useDynamicContent();
  
  const navItems = [
    { label: t.nav.home[lang], href: "/" },
    { label: t.nav.about[lang], href: "/about" },
    { label: t.nav.governance[lang], href: "/governance" },
    { label: t.nav.beneficiaries[lang], href: "/beneficiaries" },
    { label: t.nav.reports[lang], href: "/reports" },
    { label: t.nav.projects[lang], href: "/projects" },
    { label: t.nav.contact[lang], href: "/contact" },
  ];

  const Chevron = lang === "ar" ? ChevronLeft : ChevronRight;

  return (
    <footer className="relative bg-gradient-to-br from-nama-900 via-nama-800 to-nama-800 text-white overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                src={logo} 
                alt="شعار جماعة السيرة الذاتية الحياتية" 
                className="h-20 md:h-24 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
              />
            </Link>
            <p className="text-white/70 text-base leading-relaxed max-w-md mb-3">
              {t.footer.description[lang]}
            </p>
            <p className="text-white/50 text-sm leading-relaxed max-w-md">
              {lang === "ar" 
                ? "جماعة السيرة الذاتية الحياتية - جمعية أهلية ثقافية مرخصة بالرياض، رقم الترخيص 1000568500"
                : "Sira Group - A licensed cultural NGO in Riyadh, License No. 1000568500"}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 inline-block">
              {t.footer.quickLinks[lang]}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group flex items-center gap-2 text-white/70 hover:text-amber-400 transition-colors text-sm font-medium"
                >
                  <Chevron size={14} className="opacity-0 ltr:-translate-x-2 rtl:translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-500" />
                  <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 inline-block">
              {t.footer.contactInfo[lang]}
            </h4>
            <div className="flex flex-col gap-5">
              {[
                { icon: Mail, text: contactEmail || "life.group@gmail.com" },
                { icon: MapPin, text: lang === "ar" ? (contactLocationAr || "الرياض، المملكة العربية السعودية") : (contactLocationEn || "Riyadh, Saudi Arabia") },
                { icon: Mail, text: "0505226927" },
                { icon: Mail, text: "12213" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all duration-300 shadow-lg">
                    <Icon size={18} className="text-white/70 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors" dir="ltr">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50 font-medium">
            © {new Date().getFullYear()} {lang === "ar" ? "جماعة السيرة الذاتية الحياتية" : "Sira Group"}
          </p>
          <p className="text-sm text-white/50">
            {t.footer.rights[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;