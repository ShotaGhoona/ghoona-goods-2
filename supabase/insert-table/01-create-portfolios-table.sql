-- 製造実績メインテーブル
CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (category IN ('original-badge', 'standard-badge', 'acrylic-stand', 'acrylic-keychain')),
    industry VARCHAR(20) NOT NULL CHECK (industry IN ('anime', 'corporate', 'event', 'personal')),
    year INTEGER NOT NULL CHECK (year >= 2000 AND year <= 2100),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    description TEXT,
    long_description TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- インデックス作成
CREATE INDEX idx_portfolios_category ON portfolios(category);
CREATE INDEX idx_portfolios_industry ON portfolios(industry);
CREATE INDEX idx_portfolios_year ON portfolios(year);
CREATE INDEX idx_portfolios_status ON portfolios(status);
CREATE INDEX idx_portfolios_sort_order ON portfolios(sort_order);
CREATE INDEX idx_portfolios_created_at ON portfolios(created_at);

-- RLS (Row Level Security) の有効化
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- 公開データのみ読み取り可能なポリシー
CREATE POLICY "Allow public read access to active portfolios" ON portfolios
    FOR SELECT USING (status = 'active' AND deleted_at IS NULL);