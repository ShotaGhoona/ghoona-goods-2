-- 製造実績仕様テーブル
CREATE TABLE portfolio_specifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE UNIQUE,
    size VARCHAR(100),
    material VARCHAR(200),
    printing VARCHAR(200),
    finishing VARCHAR(200),
    delivery_time VARCHAR(50),
    price VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス作成
CREATE INDEX idx_portfolio_specifications_portfolio_id ON portfolio_specifications(portfolio_id);

-- RLS (Row Level Security) の有効化
ALTER TABLE portfolio_specifications ENABLE ROW LEVEL SECURITY;

-- 公開データのみ読み取り可能なポリシー
CREATE POLICY "Allow public read access to portfolio specifications" ON portfolio_specifications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM portfolios 
            WHERE portfolios.id = portfolio_specifications.portfolio_id 
            AND portfolios.status = 'active' 
            AND portfolios.deleted_at IS NULL
        )
    );