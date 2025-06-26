-- Create or replace the update_updated_at_column function if it doesn't exist
-- This function is used to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for news table
DROP TRIGGER IF EXISTS update_news_updated_at ON news;
CREATE TRIGGER update_news_updated_at
    BEFORE UPDATE ON news
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create triggers for news_images table
DROP TRIGGER IF EXISTS update_news_images_updated_at ON news_images;
CREATE TRIGGER update_news_images_updated_at
    BEFORE UPDATE ON news_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON FUNCTION update_updated_at_column() IS 'Automatically update updated_at column on row modification';
COMMENT ON TRIGGER update_news_updated_at ON news IS 'Automatically update updated_at when news record is modified';
COMMENT ON TRIGGER update_news_images_updated_at ON news_images IS 'Automatically update updated_at when news_images record is modified';