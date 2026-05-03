import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { SiteContentProvider } from "@/contexts/SiteContentContext";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Governance from "./pages/Governance";
import GovernanceCategory from "./pages/GovernanceCategory";
import Beneficiaries from "./pages/Beneficiaries";
import Reports from "./pages/Reports";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin-2030");

  if (isAdmin) {
    return (
      <>
        <ScrollToTop />
        <Routes location={location} key={location.pathname}>
          <Route path="/admin-2030" element={<AdminLogin />} />
          <Route path="/admin-2030/dashboard" element={<AdminDashboard />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <MobileBottomNav />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/governance" element={<Governance />} />
        <Route path="/governance/:slug" element={<GovernanceCategory />} />
        <Route path="/beneficiaries" element={<Beneficiaries />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SiteContentProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AnimatedRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </SiteContentProvider>
    </QueryClientProvider>
  );
};

export default App;
