-- Create news table
CREATE TABLE IF NOT EXISTS news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('新商品', 'お知らせ', 'キャンペーン', '技術', 'イベント')),
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_url VARCHAR(500),
    featured_image_alt VARCHAR(255),
    author VARCHAR(100) DEFAULT 'Ghoona Goods',
    read_time_minutes INTEGER DEFAULT 3 CHECK (read_time_minutes >= 1 AND read_time_minutes <= 60),
    view_count INTEGER DEFAULT 0 CHECK (view_count >= 0),
    is_featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
    sort_order INTEGER DEFAULT 0,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- Create indexes for news table
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at);
CREATE INDEX IF NOT EXISTS idx_news_is_featured ON news(is_featured);
CREATE INDEX IF NOT EXISTS idx_news_sort_order ON news(sort_order);
CREATE INDEX IF NOT EXISTS idx_news_view_count ON news(view_count);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at);
CREATE INDEX IF NOT EXISTS idx_news_deleted_at ON news(deleted_at);

-- Create composite index for common queries
CREATE INDEX IF NOT EXISTS idx_news_status_published_featured ON news(status, published_at DESC, is_featured DESC) WHERE deleted_at IS NULL;

-- Add RLS (Row Level Security) policies
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to published news
CREATE POLICY "Allow public read access to published news" ON news
    FOR SELECT USING (status = 'published' AND deleted_at IS NULL);

-- Policy for authenticated users to read all news (for admin)
CREATE POLICY "Allow authenticated read access to all news" ON news
    FOR SELECT USING (auth.role() = 'authenticated');

-- Policy for service role full access
CREATE POLICY "Allow service role full access to news" ON news
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Add comments for documentation
COMMENT ON TABLE news IS 'News articles table';
COMMENT ON COLUMN news.title IS 'News article title';
COMMENT ON COLUMN news.category IS 'News category (新商品, お知らせ, キャンペーン, 技術, イベント)';
COMMENT ON COLUMN news.excerpt IS 'Short summary/excerpt of the article';
COMMENT ON COLUMN news.content IS 'Full article content in HTML format';
COMMENT ON COLUMN news.featured_image_url IS 'URL of the featured image';
COMMENT ON COLUMN news.featured_image_alt IS 'Alt text for the featured image';
COMMENT ON COLUMN news.author IS 'Article author name';
COMMENT ON COLUMN news.read_time_minutes IS 'Estimated reading time in minutes';
COMMENT ON COLUMN news.view_count IS 'Number of times article has been viewed';
COMMENT ON COLUMN news.is_featured IS 'Whether this is a featured article';
COMMENT ON COLUMN news.status IS 'Publication status (draft, published, scheduled, archived)';
COMMENT ON COLUMN news.sort_order IS 'Custom sort order for display';
COMMENT ON COLUMN news.published_at IS 'Date and time when article was/will be published';
COMMENT ON COLUMN news.deleted_at IS 'Soft delete timestamp';