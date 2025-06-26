-- Create news_views table for tracking article views
CREATE TABLE IF NOT EXISTS news_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    news_id UUID NOT NULL REFERENCES news(id) ON DELETE CASCADE,
    ip_address VARCHAR(45), -- IPv6 compatible (max 45 chars)
    user_agent TEXT,
    viewed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for news_views table
CREATE INDEX IF NOT EXISTS idx_news_views_news_id ON news_views(news_id);
CREATE INDEX IF NOT EXISTS idx_news_views_viewed_at ON news_views(viewed_at);
CREATE INDEX IF NOT EXISTS idx_news_views_ip_address ON news_views(ip_address);
CREATE INDEX IF NOT EXISTS idx_news_views_created_at ON news_views(created_at);

-- Create composite index for duplicate view prevention
CREATE INDEX IF NOT EXISTS idx_news_views_news_ip_time ON news_views(news_id, ip_address, viewed_at);

-- Create composite index for recent view checks (optimized for the duplicate prevention query)
CREATE INDEX IF NOT EXISTS idx_news_views_duplicate_check ON news_views(news_id, ip_address, viewed_at DESC);

-- Add RLS (Row Level Security) policies
ALTER TABLE news_views ENABLE ROW LEVEL SECURITY;

-- Policy for service role full access (views are typically managed by backend only)
CREATE POLICY "Allow service role full access to news views" ON news_views
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Policy for authenticated users to read view statistics (for admin dashboard)
CREATE POLICY "Allow authenticated read access to view statistics" ON news_views
    FOR SELECT USING (auth.role() = 'authenticated');

-- Add comments for documentation
COMMENT ON TABLE news_views IS 'View tracking for news articles to count unique views and analytics';
COMMENT ON COLUMN news_views.news_id IS 'Reference to the viewed news article';
COMMENT ON COLUMN news_views.ip_address IS 'IP address of the viewer (IPv4/IPv6 compatible)';
COMMENT ON COLUMN news_views.user_agent IS 'Browser user agent string for analytics';
COMMENT ON COLUMN news_views.viewed_at IS 'Timestamp when the article was viewed';

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_news_view_count(target_news_id UUID, client_ip VARCHAR(45), client_user_agent TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    recent_view_exists BOOLEAN;
    view_recorded BOOLEAN := FALSE;
BEGIN
    -- Check for recent view from same IP (within 1 hour)
    SELECT EXISTS(
        SELECT 1 FROM news_views 
        WHERE news_id = target_news_id 
        AND ip_address = client_ip 
        AND viewed_at > NOW() - INTERVAL '1 hour'
    ) INTO recent_view_exists;
    
    -- If no recent view, record new view and increment counter
    IF NOT recent_view_exists THEN
        -- Insert view record
        INSERT INTO news_views (news_id, ip_address, user_agent, viewed_at)
        VALUES (target_news_id, client_ip, client_user_agent, NOW());
        
        -- Increment view count in news table
        UPDATE news 
        SET view_count = view_count + 1 
        WHERE id = target_news_id;
        
        view_recorded := TRUE;
    END IF;
    
    RETURN view_recorded;
EXCEPTION
    WHEN OTHERS THEN
        -- Log error but don't fail the request
        RAISE WARNING 'Failed to increment view count for news %: %', target_news_id, SQLERRM;
        RETURN FALSE;
END;
$$;

-- Add comment for the function
COMMENT ON FUNCTION increment_news_view_count IS 'Safely increment news view count with duplicate prevention';