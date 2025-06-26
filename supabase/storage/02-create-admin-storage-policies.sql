-- Create additional storage bucket for admin uploads (thumbnails, temp files)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'admin-uploads',
  'admin-uploads',
  false, -- Private bucket
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
);

-- Policy: Allow admin users to manage admin-uploads bucket
CREATE POLICY "Admin users can manage admin uploads"
ON storage.objects FOR ALL
USING (
  bucket_id = 'admin-uploads' 
  AND auth.role() = 'authenticated'
  -- Add admin role check here when implementing user roles
);

-- Function to generate secure file names
CREATE OR REPLACE FUNCTION generate_portfolio_image_path(
  portfolio_id UUID,
  original_filename TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  file_extension TEXT;
  timestamp_str TEXT;
  random_str TEXT;
BEGIN
  -- Extract file extension
  file_extension := lower(substring(original_filename from '\.([^\.]+)$'));
  
  -- Generate timestamp
  timestamp_str := to_char(now(), 'YYYYMMDD_HH24MISS');
  
  -- Generate random string
  random_str := substr(md5(random()::text), 1, 8);
  
  -- Return formatted path
  RETURN format('portfolios/%s/%s_%s.%s', 
    portfolio_id, 
    timestamp_str, 
    random_str, 
    file_extension
  );
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION generate_portfolio_image_path(UUID, TEXT) TO authenticated;