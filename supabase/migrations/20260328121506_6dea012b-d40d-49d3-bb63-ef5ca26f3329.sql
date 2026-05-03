-- Create storage bucket for admin uploads (images, PDFs, logo)
INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true);

-- Allow anyone to read files (public site)
CREATE POLICY "Public read access for site assets" ON storage.objects FOR SELECT USING (bucket_id = 'site-assets');

-- Allow anyone to upload (admin auth handled in app layer)
CREATE POLICY "Anyone can upload site assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'site-assets');

-- Allow anyone to update site assets
CREATE POLICY "Anyone can update site assets" ON storage.objects FOR UPDATE USING (bucket_id = 'site-assets') WITH CHECK (bucket_id = 'site-assets');

-- Allow anyone to delete site assets
CREATE POLICY "Anyone can delete site assets" ON storage.objects FOR DELETE USING (bucket_id = 'site-assets');