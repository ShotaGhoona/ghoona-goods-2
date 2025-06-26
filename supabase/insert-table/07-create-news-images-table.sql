-- Create news_images table
CREATE TABLE IF NOT EXISTS news_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    news_id UUID NOT NULL REFERENCES news(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    caption TEXT,
    sort_order INTEGER DEFAULT 0,
    image_type VARCHAR(20) DEFAULT 'content' CHECK (image_type IN ('featured', 'content', 'gallery')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for news_images table
CREATE INDEX IF NOT EXISTS idx_news_images_news_id ON news_images(news_id);
CREATE INDEX IF NOT EXISTS idx_news_images_sort_order ON news_images(sort_order);
CREATE INDEX IF NOT EXISTS idx_news_images_image_type ON news_images(image_type);
CREATE INDEX IF NOT EXISTS idx_news_images_created_at ON news_images(created_at);

-- Create composite index for common queries
CREATE INDEX IF NOT EXISTS idx_news_images_news_id_sort_order ON news_images(news_id, sort_order);

-- Add RLS (Row Level Security) policies
ALTER TABLE news_images ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to images of published news
CREATE POLICY "Allow public read access to published news images" ON news_images
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM news 
            WHERE news.id = news_images.news_id 
            AND news.status = 'published' 
            AND news.deleted_at IS NULL
        )
    );

-- Policy for authenticated users to read all news images (for admin)
CREATE POLICY "Allow authenticated read access to all news images" ON news_images
    FOR SELECT USING (auth.role() = 'authenticated');

-- Policy for service role full access
CREATE POLICY "Allow service role full access to news images" ON news_images
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Add comments for documentation
COMMENT ON TABLE news_images IS 'Images associated with news articles';
COMMENT ON COLUMN news_images.news_id IS 'Reference to the news article';
COMMENT ON COLUMN news_images.image_url IS 'URL of the image';
COMMENT ON COLUMN news_images.alt_text IS 'Alternative text for accessibility';
COMMENT ON COLUMN news_images.caption IS 'Image caption or description';
COMMENT ON COLUMN news_images.sort_order IS 'Display order of images within the article';
COMMENT ON COLUMN news_images.image_type IS 'Type of image (featured, content, gallery)';