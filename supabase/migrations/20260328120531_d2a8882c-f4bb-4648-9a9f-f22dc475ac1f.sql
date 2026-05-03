-- Create site_content table to store all editable site content as JSON
CREATE TABLE public.site_content (
  id TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read site content (public site)
CREATE POLICY "Anyone can read site content"
  ON public.site_content FOR SELECT
  USING (true);

-- Allow anonymous update (admin auth handled in app layer with hardcoded credentials)
CREATE POLICY "Anyone can update site content"
  ON public.site_content FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow insert for initial seeding
CREATE POLICY "Anyone can insert site content"
  ON public.site_content FOR INSERT
  WITH CHECK (true);

-- Insert default empty row
INSERT INTO public.site_content (id, content) VALUES ('main', '{}'::jsonb);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_site_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_content_timestamp
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.update_site_content_updated_at();