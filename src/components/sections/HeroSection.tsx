import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";
import { ArrowDown } from "lucide-react";
import logo from "../../../public/logo.png";

const HeroSection = () => {
  const { lang, t } = useLang();

  const springTransition = {
    type: "spring",
    stiffness: 120,
    damping: 15,
    mass: 0.8,
  } as const;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Hero Background" 
          className="w-full h-full object-cover scale-105 animate-slow-zoom" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-nama-900/40 to-nama-900/80 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center justify-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...springTransition, duration: 0.6 }}
          className="mb-8"
        >
          <img 
            src={logo} 
            alt="Logo" 
            className="w-32 h-auto md:w-48 lg:w-56 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)]" 
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-primary-foreground mb-6 tracking-tight drop-shadow-lg"
        >
          {t.hero.title[lang]}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.2 }}
          className="text-2xl md:text-3xl text-primary-foreground/90 font-semibold mb-6 drop-shadow-md"
        >
          {t.hero.subtitle[lang]}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.3 }}
          className="text-lg md:text-xl text-primary-foreground/70 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {t.hero.description[lang]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
        >
          <a
            href="#vision"
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-accent text-accent-foreground font-bold text-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all duration-300"
          >
            {t.hero.cta1[lang]}
          </a>
          <a
            href="#projects"
            className="w-full sm:w-auto px-10 py-4 rounded-full backdrop-blur-md border border-primary-foreground/30 text-primary-foreground font-bold text-lg hover:bg-primary-foreground/10 hover:-translate-y-1 transition-all duration-300"
          >
            {t.hero.cta2[lang]}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-8 h-12 rounded-full border-2 border-primary-foreground/30 flex justify-center p-1 backdrop-blur-sm"
        >
          <motion.div 
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-primary-foreground rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;