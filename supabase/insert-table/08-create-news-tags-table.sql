-- Create news_tags table
CREATE TABLE IF NOT EXISTS news_tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    news_id UUID NOT NULL REFERENCES news(id) ON DELETE CASCADE,
    tag_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Ensure no duplicate tags for the same news article
    UNIQUE(news_id, tag_name)
);

-- Create indexes for news_tags table
CREATE INDEX IF NOT EXISTS idx_news_tags_news_id ON news_tags(news_id);
CREATE INDEX IF NOT EXISTS idx_news_tags_tag_name ON news_tags(tag_name);
CREATE INDEX IF NOT EXISTS idx_news_tags_created_at ON news_tags(created_at);

-- Create composite index for tag search
CREATE INDEX IF NOT EXISTS idx_news_tags_tag_name_news_id ON news_tags(tag_name, news_id);

-- Add RLS (Row Level Security) policies
ALTER TABLE news_tags ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to tags of published news
CREATE POLICY "Allow public read access to published news tags" ON news_tags
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM news 
            WHERE news.id = news_tags.news_id 
            AND news.status = 'published' 
            AND news.deleted_at IS NULL
        )
    );

-- Policy for authenticated users to read all news tags (for admin)
CREATE POLICY "Allow authenticated read access to all news tags" ON news_tags
    FOR SELECT USING (auth.role() = 'authenticated');

-- Policy for service role full access
CREATE POLICY "Allow service role full access to news tags" ON news_tags
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Add comments for documentation
COMMENT ON TABLE news_tags IS 'Tags associated with news articles for categorization and search';
COMMENT ON COLUMN news_tags.news_id IS 'Reference to the news article';
COMMENT ON COLUMN news_tags.tag_name IS 'Tag name for categorization';
COMMENT ON CONSTRAINT news_tags_news_id_tag_name_key ON news_tags IS 'Prevent duplicate tags on the same article';