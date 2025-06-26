-- 製造実績画像テーブル
CREATE TABLE portfolio_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    is_thumbnail BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス作成
CREATE INDEX idx_portfolio_images_portfolio_id ON portfolio_images(portfolio_id);
CREATE INDEX idx_portfolio_images_sort_order ON portfolio_images(sort_order);
CREATE INDEX idx_portfolio_images_is_thumbnail ON portfolio_images(is_thumbnail);

-- RLS (Row Level Security) の有効化
ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;

-- 公開データのみ読み取り可能なポリシー
CREATE POLICY "Allow public read access to portfolio images" ON portfolio_images
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM portfolios 
            WHERE portfolios.id = portfolio_images.portfolio_id 
            AND portfolios.status = 'active' 
            AND portfolios.deleted_at IS NULL
        )
    );