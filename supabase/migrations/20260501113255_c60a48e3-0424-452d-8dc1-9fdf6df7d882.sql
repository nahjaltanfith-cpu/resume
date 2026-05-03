
UPDATE public.site_content
SET content = jsonb_set(
  content,
  '{governance_docs}',
  COALESCE(content->'governance_docs', '[]'::jsonb) || jsonb_build_array(
    jsonb_build_object('title_ar','دليل السياسات والإجراءات المالية والمحاسبية','title_en','Financial & Accounting Policies and Procedures Guide','url','https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs%2Ffinancial-accounting-guide.pdf','category','policies'),
    jsonb_build_object('title_ar','دليل مؤشرات وإجراءات عمليات غسيل الأموال وتمويل الإرهاب','title_en','AML/CFT Indicators & Procedures Guide','url','https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs%2Faml-indicators-guide.pdf','category','mechanisms'),
    jsonb_build_object('title_ar','دور مجلس الإدارة في سياسات وإجراءات الوقاية من غسل الأموال ومكافحة الإرهاب','title_en','Board of Directors Role in AML/CFT Policies','url','https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs%2Fboard-aml-role.pdf','category','mechanisms'),
    jsonb_build_object('title_ar','سياسات الصرف للبرامج والأنشطة والمصروفات الإدارية والعمومية','title_en','Disbursement Policies for Programs, Activities & General Expenses','url','https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs%2Fdisbursement-policy.pdf','category','policies_advanced'),
    jsonb_build_object('title_ar','سياسة إدارة المتطوعين','title_en','Volunteer Management Policy','url','https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs%2Fvolunteer-management-policy.pdf','category','policies_advanced'),
    jsonb_build_object('title_ar','سياسة إدارة المخاطر','title_en','Risk Management Policy','url','https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs%2Frisk-management-policy.pdf','category','policies_advanced'),
    jsonb_build_object('title_ar','سياسة الإبلاغ عن المخالفات وحماية مقدمي البلاغات','title_en','Whistleblower Policy & Reporter Protection','url','https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs%2Fwhistleblower-policy.pdf','category','policies_advanced'),
    jsonb_build_object('title_ar','سياسة الاحتفاظ بالوثائق وإتلافها','title_en','Document Retention & Destruction Policy','url','https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs%2Fdocument-retention-policy.pdf','category','policies_advanced'),
    jsonb_build_object('title_ar','سياسة الاستبدال والإرجاع الخاصة بالتبرعات','title_en','Donation Return & Exchange Policy','url','https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs%2Fdonation-return-policy.pdf','category','policies_advanced'),
    jsonb_build_object('title_ar','سياسة الاستثمار','title_en','Investment Policy','url','https://icaluxiraityruryivvl.supabase.co/storage/v1/object/public/site-assets/pdfs%2Finvestment-policy.pdf','category','policies_advanced')
  )
)
WHERE id = 'main';
