-- Seed categorized governance & reports docs
update public.site_content
set content = jsonb_set(
  jsonb_set(
    coalesce(content, '{}'::jsonb),
    '{governance_docs}',
    '[
      {"category":"policies","title_ar":"اللائحة المالية","title_en":"Financial Regulations","url":"https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs/financial-regulations.pdf"},
      {"category":"policies","title_ar":"الميثاق الأخلاقي للعاملين","title_en":"Code of Ethics for Employees","url":"https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs/ethics-charter.pdf"},
      {"category":"policies","title_ar":"الدليل التعريفي لمجلس الإدارة","title_en":"Board of Directors Introductory Guide","url":"https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs/board-guide.pdf"},
      {"category":"policies","title_ar":"الوصف الوظيفي لمسؤول الالتزام","title_en":"Compliance Officer Job Description","url":"https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs/compliance-officer-jd.pdf"},
      {"category":"mechanisms","title_ar":"آلية قبول أعضاء الجمعية العمومية","title_en":"General Assembly Membership Acceptance Mechanism","url":"https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs/mechanism-general-assembly.pdf"},
      {"category":"mechanisms","title_ar":"آلية التأكد من استحقاق المستفيد للخدمة","title_en":"Beneficiary Eligibility Verification Mechanism","url":"https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs/mechanism-beneficiary-eligibility.pdf"},
      {"category":"mechanisms","title_ar":"آلية استرداد التبرع للمتبرع","title_en":"Donation Refund Mechanism","url":"https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs/mechanism-donation-refund.pdf"},
      {"category":"mechanisms","title_ar":"آلية التحقق من وصول التبرع للمستفيد النهائي","title_en":"Donation Delivery Verification Mechanism","url":"https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs/mechanism-donation-delivery.pdf"},
      {"category":"mechanisms","title_ar":"الدليل الإجرائي لتجنب تنبيه العميل أو المتبرع المشتبه به","title_en":"Procedural Guide for Suspicious Client/Donor Alerts","url":"https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs/procedure-suspicious-donor.pdf"}
    ]'::jsonb
  ),
  '{reports_docs}',
  '[
    {"category":"assessments","title_ar":"تقييم المخاطر المتأصلة والكامنة","title_en":"Inherent and Latent Risk Assessment","url":"https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs/risk-assessment.pdf"}
  ]'::jsonb
),
updated_at = now()
where id = 'main';