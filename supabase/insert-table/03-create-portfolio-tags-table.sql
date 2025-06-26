-- 製造実績タグテーブル
CREATE TABLE portfolio_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    tag_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(portfolio_id, tag_name)
);

-- インデックス作成
CREATE INDEX idx_portfolio_tags_portfolio_id ON portfolio_tags(portfolio_id);
CREATE INDEX idx_portfolio_tags_tag_name ON portfolio_tags(tag_name);

-- RLS (Row Level Security) の有効化
ALTER TABLE portfolio_tags ENABLE ROW LEVEL SECURITY;

-- 公開データのみ読み取り可能なポリシー
CREATE POLICY "Allow public read access to portfolio tags" ON portfolio_tags
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM portfolios 
            WHERE portfolios.id = portfolio_tags.portfolio_id 
            AND portfolios.status = 'active' 
            AND portfolios.deleted_at IS NULL
        )
    );