-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-images',
  'portfolio-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to portfolio images
CREATE POLICY "Public read access for portfolio images"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');

-- Policy: Allow authenticated users to upload portfolio images
CREATE POLICY "Authenticated users can upload portfolio images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = 'portfolios'
);

-- Policy: Allow authenticated users to update their uploaded images
CREATE POLICY "Authenticated users can update portfolio images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = 'portfolios'
);

-- Policy: Allow authenticated users to delete their uploaded images
CREATE POLICY "Authenticated users can delete portfolio images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = 'portfolios'
);