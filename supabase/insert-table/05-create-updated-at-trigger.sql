-- updated_at を自動更新するトリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- portfolios テーブルのトリガー
CREATE TRIGGER update_portfolios_updated_at 
    BEFORE UPDATE ON portfolios 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- portfolio_images テーブルのトリガー
CREATE TRIGGER update_portfolio_images_updated_at 
    BEFORE UPDATE ON portfolio_images 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- portfolio_specifications テーブルのトリガー
CREATE TRIGGER update_portfolio_specifications_updated_at 
    BEFORE UPDATE ON portfolio_specifications 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();