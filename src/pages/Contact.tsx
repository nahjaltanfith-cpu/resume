import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";

import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { useDynamicContent } from "@/hooks/useDynamicContent";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(2000),
});

const Contact = () => {
  const { lang, t } = useLang();
  const { contactEmail, contactLocationAr, contactLocationEn } = useDynamicContent();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = lang === "ar" ? "هذا الحقل مطلوب" : "This field is required";
        if (err.code === "too_big") fieldErrors[field] = lang === "ar" ? "النص طويل جداً" : "Too long";
        if (field === "email" && err.code === "invalid_string") fieldErrors[field] = lang === "ar" ? "بريد إلكتروني غير صالح" : "Invalid email";
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputClass = (field: string) =>
    `w-full px-5 py-3.5 rounded-xl border ${errors[field] ? "border-destructive" : "border-border"} bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all`;

  return (
    <PageTransition>
      <SEOHead
        titleAr="تواصل معنا | جمعية دعائم"
        titleEn="Contact Us | Daaem Association"
        descriptionAr="تواصل مع جمعية دعائم - الهفوف، محافظة الأحساء. البريد: daaemedu@gmail.com"
        descriptionEn="Contact Daaem Association - Abha, Al-Ahsa region. Email: daaemedu@gmail.com"
      />
      <div className="min-h-screen">
        
        <PageHero title={t.contact.title[lang]} subtitle={t.contact.subtitle[lang]} />

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Purpose Banner */}
            <AnimatedSection className="mb-12">
              <div className="text-center p-8 rounded-3xl bg-soft border-2 border-gold/30 shadow-lg">
                <p className="text-lg md:text-xl font-semibold text-foreground">
                  {lang === "ar"
                    ? "تواصل معنا لطلب العضوية أو تقديم شكوى أو اقتراح"
                    : "Contact us for membership requests, complaints, or suggestions"}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Form */}
              <AnimatedSection direction="left" className="lg:col-span-3">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-20 px-8 rounded-3xl bg-soft border border-border"
                  >
                    <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center mb-6">
                      <CheckCircle2 className="text-gold-foreground" size={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {lang === "ar" ? "تم إرسال رسالتك بنجاح!" : "Message Sent Successfully!"}
                    </h3>
                    <p className="text-muted-foreground">
                      {lang === "ar" ? "سنتواصل معك في أقرب وقت ممكن" : "We'll get back to you as soon as possible"}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-6 p-8 md:p-10 rounded-3xl bg-soft border-2 border-gold/20 shadow-xl ring-1 ring-gold/10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { field: "name", label: t.contact.name[lang], type: "text", max: 100 },
                        { field: "email", label: t.contact.email[lang], type: "email", max: 255 },
                      ].map(({ field, label, type, max }, i) => (
                        <motion.div
                          key={field}
                          initial={{ opacity: 0, x: i === 0 ? 20 : -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                        >
                          <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>
                          <motion.input
                            whileFocus={{ scale: 1.01, borderColor: "hsl(var(--gold))" }}
                            type={type}
                            value={form[field as keyof typeof form]}
                            onChange={(e) => handleChange(field, e.target.value)}
                            maxLength={max}
                            className={inputClass(field)}
                          />
                          {errors[field] && <p className="text-destructive text-xs mt-1">{errors[field]}</p>}
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <label className="block text-sm font-semibold text-foreground mb-2">{t.contact.subject[lang]}</label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="text"
                        value={form.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        maxLength={200}
                        className={inputClass("subject")}
                      />
                      {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <label className="block text-sm font-semibold text-foreground mb-2">{t.contact.message[lang]}</label>
                      <motion.textarea
                        whileFocus={{ scale: 1.01 }}
                        rows={6}
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        maxLength={2000}
                        className={`${inputClass("message")} resize-none`}
                      />
                      {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="flex justify-center"
                    >
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl gradient-gold text-gold-foreground font-bold shadow-xl hover:shadow-2xl transition-shadow text-lg"
                      >
                        <Send size={20} />
                        {t.contact.send[lang]}
                      </motion.button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatedSection>

              {/* Contact Info */}
              <AnimatedSection direction="right" className="lg:col-span-2">
                <div className="space-y-6">
                  <div className="p-8 rounded-3xl bg-soft border-2 border-gold/20 shadow-xl ring-1 ring-gold/10">
                    <h3 className="text-xl font-bold text-foreground mb-8">
                      {lang === "ar" ? <>معلومات <span className="text-gradient-gold">التواصل</span></> : <><span className="text-gradient-gold">Contact</span> Information</>}
                    </h3>
                    <div className="space-y-6">
                      {[
                        { icon: Mail, label: lang === "ar" ? "البريد الإلكتروني" : "Email", value: contactEmail || "daaemedu@gmail.com" },
                        { icon: Mail, label: lang === "ar" ? "الجوال" : "Phone", value: "0538807776" },
                        { icon: Mail, label: lang === "ar" ? "الموقع" : "Website", value: "www.daaem.edu.sa" },
                        { icon: MapPin, label: lang === "ar" ? "العنوان" : "Address", value: lang === "ar" ? (contactLocationAr || "الهفوف، محافظة الأحساء، المنطقة الشرقية") : (contactLocationEn || "Hofuf, Al-Ahsa Governorate, Eastern Province") },
                      ].map(({ icon: Icon, label, value }, i) => (
                        <motion.div key={i} whileHover={{ x: lang === "ar" ? -4 : 4 }} className="flex items-start gap-4 group">
                          <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Icon className="text-gold-foreground" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-0.5">{label}</p>
                            <p className="font-semibold text-foreground" dir="ltr">{value}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-soft">
          <AnimatedSection className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {lang === "ar" ? <>موقعنا على <span className="text-gradient-gold">الخريطة</span></> : <>Find Us on the <span className="text-gradient-gold">Map</span></>}
              </h2>
              <div className="w-16 h-1 rounded-full gradient-gold mx-auto" />
            </div>
            <div className="rounded-3xl overflow-hidden border border-border shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115163!2d49.5!3d25.3833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e34f6e0e9bf9e5b%3A0x0!2sHofuf%20Saudi%20Arabia!5e0!3m2!1sar!2ssa!4v1700000000000!5m2!1sar!2ssa"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={lang === "ar" ? "موقع جمعية دعائم" : "Daaem Association Location"}
              />
            </div>
          </AnimatedSection>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Contact;
