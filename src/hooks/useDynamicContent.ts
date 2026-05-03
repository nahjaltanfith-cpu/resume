import { useSiteContent } from "@/contexts/SiteContentContext";
import defaultLogo from "/logo.png";

export const useDynamicContent = () => {
  const { content } = useSiteContent();
  
  return {
    logoUrl: content.logo_url || defaultLogo,
    heroImages: content.hero_images,
    projectImage: content.project_image,
    governancePdf: content.governance_pdf,
    reportsPdf: content.reports_pdf,
    governanceDocs: content.governance_docs || [],
    reportsDocs: content.reports_docs || [],
    governancePdfHidden: !!content.governance_pdf_hidden,
    reportsPdfHidden: !!content.reports_pdf_hidden,
    contactEmail: content.contact_email,
    contactLocationAr: content.contact_location_ar,
    contactLocationEn: content.contact_location_en,
  };
};
