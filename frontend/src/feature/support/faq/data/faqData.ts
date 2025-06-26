export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  popularity?: number;
}

export interface FAQCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const faqCategories: FAQCategory[] = [
  {
    id: "products",
    name: "商品・仕様",
    description: "商品の仕様や材質、カスタマイズに関するご質問",
    icon: "🏷️"
  },
  {
    id: "order",
    name: "注文・納期",
    description: "ご注文方法や納期、最小ロットに関するご質問",
    icon: "📦"
  },
  {
    id: "data",
    name: "データ入稿・制作",
    description: "データの作成方法や入稿に関するご質問",
    icon: "💾"
  },
  {
    id: "price",
    name: "価格・支払い",
    description: "料金体系や支払い方法に関するご質問",
    icon: "💰"
  }
];

export const faqData: FAQItem[] = [
  // 商品・仕様に関する質問
  {
    id: "product-001",
    category: "products",
    question: "缶バッジのサイズはどのような種類がありますか？",
    answer: "缶バッジは25mm、32mm、38mm、44mm、57mm、76mmの6種類のサイズをご用意しております。最も人気が高いのは44mmサイズです。用途に応じてお選びいただけます。",
    tags: ["缶バッジ", "サイズ", "仕様"],
    popularity: 95
  },
  {
    id: "product-002",
    category: "products",
    question: "アクリルスタンドの厚みはどれくらいですか？",
    answer: "アクリルスタンドの厚みは標準で3mmです。より厚みのある5mmや薄手の2mmにも対応可能です。厚みによって価格が変わりますので、詳しくはお見積りください。",
    tags: ["アクリルスタンド", "厚み", "仕様"],
    popularity: 87
  },
  {
    id: "product-003",
    category: "products",
    question: "オリジナル缶バッジと通常缶バッジの違いは何ですか？",
    answer: "オリジナル缶バッジは完全オリジナル設計で特殊な形状や素材にも対応可能です。通常缶バッジは標準的な円形で、コストパフォーマンスと短納期を重視した商品です。",
    tags: ["缶バッジ", "オリジナル", "違い"],
    popularity: 82
  },
  {
    id: "product-004",
    category: "products",
    question: "どのような材質を使用していますか？",
    answer: "機構部品メーカーとして培った品質基準で、缶バッジにはスチール・アルミニウム、アクリル製品には高品質なアクリル樹脂を使用しています。全て安全基準をクリアした材質です。",
    tags: ["材質", "品質", "安全"],
    popularity: 78
  },

  // 注文・納期に関する質問
  {
    id: "order-001",
    category: "order",
    question: "最小ロットはどれくらいですか？",
    answer: "商品によって異なりますが、缶バッジは50個から、アクリル製品は10個からご注文いただけます。オリジナル缶バッジは1個からの対応も可能です。",
    tags: ["最小ロット", "注文数", "個数"],
    popularity: 92
  },
  {
    id: "order-002",
    category: "order",
    question: "納期はどれくらいかかりますか？",
    answer: "通常商品で約7-10営業日、オリジナル商品で約14-21営業日です。数量や仕様により変動しますので、正確な納期はお見積り時にご案内いたします。",
    tags: ["納期", "期間", "日数"],
    popularity: 89
  },
  {
    id: "order-003",
    category: "order",
    question: "急ぎの注文に対応できますか？",
    answer: "はい、特急料金にて対応可能です。通常納期の半分程度まで短縮できる場合があります。まずはお電話にてご相談ください。",
    tags: ["急ぎ", "特急", "短納期"],
    popularity: 76
  },
  {
    id: "order-004",
    category: "order",
    question: "注文後にキャンセルや変更はできますか？",
    answer: "製作開始前であればキャンセル・変更が可能です。製作開始後は変更をお受けできませんので、ご注文前に内容をよくご確認ください。",
    tags: ["キャンセル", "変更", "注文"],
    popularity: 71
  },

  // データ入稿・制作に関する質問
  {
    id: "data-001",
    category: "data",
    question: "どのようなファイル形式でデータを入稿すればよいですか？",
    answer: "Illustrator（.ai）、Photoshop（.psd）、PDF、PNG、JPEGに対応しています。ベクターデータ（.ai、.pdf）を推奨いたします。解像度は300dpi以上でお願いします。",
    tags: ["ファイル形式", "入稿", "データ"],
    popularity: 94
  },
  {
    id: "data-002",
    category: "data",
    question: "カラーモードはCMYKとRGBどちらがよいですか？",
    answer: "印刷はCMYKで行いますので、CMYKでの作成を推奨します。RGBでご入稿いただいた場合は、弊社でCMYKに変換いたしますが、色味が変わる可能性があります。",
    tags: ["カラーモード", "CMYK", "RGB"],
    popularity: 85
  },
  {
    id: "data-003",
    category: "data",
    question: "デザインの修正や校正は何回まで可能ですか？",
    answer: "校正は2回まで無料で対応いたします。3回目以降は別途校正料金が発生いたします。初回校正で詳細にご確認いただくことをお勧めします。",
    tags: ["校正", "修正", "回数"],
    popularity: 73
  },
  {
    id: "data-004",
    category: "data",
    question: "デザインの制作もお願いできますか？",
    answer: "はい、デザイン制作も承っております。ラフスケッチやご要望をお聞かせいただければ、プロのデザイナーがご提案いたします。別途デザイン料が発生いたします。",
    tags: ["デザイン制作", "デザイナー", "依頼"],
    popularity: 68
  },

  // 価格・支払いに関する質問
  {
    id: "price-001",
    category: "price",
    question: "価格はどのように決まりますか？",
    answer: "商品の種類、サイズ、数量、仕様によって価格が決まります。詳細な仕様をお教えいただければ、無料でお見積りいたします。数量が多いほど単価は安くなります。",
    tags: ["価格", "見積り", "料金"],
    popularity: 91
  },
  {
    id: "price-002",
    category: "price",
    question: "支払い方法を教えてください。",
    answer: "銀行振込、クレジットカード決済、代金引換に対応しています。法人のお客様は掛け払いも可能です。詳しくはお問い合わせください。",
    tags: ["支払い方法", "決済", "振込"],
    popularity: 84
  },
  {
    id: "price-003",
    category: "price",
    question: "送料はいくらかかりますか？",
    answer: "全国一律500円です。10,000円以上のご注文で送料無料となります。大口注文の場合は別途ご相談ください。",
    tags: ["送料", "配送料", "無料"],
    popularity: 79
  },
  {
    id: "price-004",
    category: "price",
    question: "消費税は含まれていますか？",
    answer: "表示価格は全て税抜き価格です。別途消費税を申し受けます。お見積書には税込み価格も記載いたします。",
    tags: ["消費税", "税抜き", "税込み"],
    popularity: 69
  }
];

// 人気のFAQを取得
export const getPopularFAQs = (limit: number = 5): FAQItem[] => {
  return faqData
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, limit);
};

// カテゴリー別FAQを取得
export const getFAQsByCategory = (categoryId: string): FAQItem[] => {
  return faqData.filter(faq => faq.category === categoryId);
};

// 検索機能
export const searchFAQs = (query: string): FAQItem[] => {
  const lowercaseQuery = query.toLowerCase();
  return faqData.filter(faq => 
    faq.question.toLowerCase().includes(lowercaseQuery) ||
    faq.answer.toLowerCase().includes(lowercaseQuery) ||
    faq.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};