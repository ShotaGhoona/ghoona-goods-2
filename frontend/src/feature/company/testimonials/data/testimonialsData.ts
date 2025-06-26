/**
 * お客様の声ページのデータ定義
 * 魅力的で信頼性の高いお客様の声を集約
 */

export interface Testimonial {
  id: string
  name: string
  company: string
  position: string
  avatar?: string
  rating: number
  category: TestimonialCategory
  product: string
  testimonialText: string
  highlights: string[]
  orderDetails: {
    quantity: number
    deliveryTime: string
    satisfaction: string
  }
  date: string
  location: string
  isVerified: boolean
  tags: string[]
}

export interface TestimonialStats {
  averageRating: number
  totalReviews: number
  categoryBreakdown: {
    category: TestimonialCategory
    count: number
    averageRating: number
  }[]
  satisfactionRate: number
}

export type TestimonialCategory = 
  | 'quality' 
  | 'delivery' 
  | 'customer-service' 
  | 'design'
  | 'value'
  | 'overall'

export const testimonialCategoryLabels: Record<TestimonialCategory, string> = {
  quality: '品質・仕上がり',
  delivery: '納期・配送',
  'customer-service': '顧客サポート',
  design: 'デザイン対応',
  value: 'コストパフォーマンス',
  overall: '総合評価'
}

export const testimonialsData: Testimonial[] = [
  {
    id: 'testimonial-001',
    name: '田中 美咲',
    company: '株式会社クリエイティブスタジオ',
    position: 'マーケティング部 部長',
    avatar: '/images/testimonials/tanaka.jpg',
    rating: 5,
    category: 'quality',
    product: 'オリジナル缶バッジ',
    testimonialText: '機構部品メーカーならではの精密さに驚きました。細部まで妥協のない仕上がりで、お客様からも「どこで作ったの？」と必ず聞かれます。品質の違いが一目で分かる、まさにプロフェッショナルな仕事です。',
    highlights: [
      '精密な仕上がりに顧客も驚嘆',
      'プロフェッショナルな品質',
      '細部への妥協ない姿勢'
    ],
    orderDetails: {
      quantity: 500,
      deliveryTime: '7営業日',
      satisfaction: '期待を大幅に上回る'
    },
    date: '2024年5月15日',
    location: '東京都',
    isVerified: true,
    tags: ['高品質', '精密', 'プロ仕様']
  },
  {
    id: 'testimonial-002', 
    name: '佐藤 健一',
    company: 'イベント企画 NEXT',
    position: '代表取締役',
    avatar: '/images/testimonials/sato.jpg',
    rating: 5,
    category: 'delivery',
    product: 'アクリルスタンド',
    testimonialText: '急な依頼にも関わらず、特急対応で理想の納期を実現していただきました。しかも品質は一切妥協なし。機構部品の技術を活かした設計で、倒れにくく実用性も抜群です。頼れるパートナーを見つけました。',
    highlights: [
      '急な依頼でも特急対応',
      '品質に一切妥協なし',
      '実用性抜群の設計'
    ],
    orderDetails: {
      quantity: 200,
      deliveryTime: '3営業日（特急）',
      satisfaction: '完璧な対応'
    },
    date: '2024年6月1日',
    location: '大阪府',
    isVerified: true,
    tags: ['特急対応', '実用性', '信頼性']
  },
  {
    id: 'testimonial-003',
    name: '山田 あゆみ',
    company: 'アニメーション制作 SPARK',
    position: 'プロデューサー',
    avatar: '/images/testimonials/yamada.jpg',
    rating: 5,
    category: 'design',
    product: 'アクリルキーホルダー',
    testimonialText: '私たちの複雑なキャラクターデザインを完璧に再現していただきました。色の微調整から金具の選定まで、細やかな提案で作品愛を感じました。ファンの皆様にも「公式グッズの中で一番クオリティが高い」と大好評です。',
    highlights: [
      '複雑なデザインも完璧再現',
      '細やかな提案と作品愛',
      'ファンからも最高評価'
    ],
    orderDetails: {
      quantity: 1000,
      deliveryTime: '10営業日',
      satisfaction: 'ファンも大満足'
    },
    date: '2024年5月28日',
    location: '東京都',
    isVerified: true,
    tags: ['デザイン再現', '提案力', 'ファン満足']
  },
  {
    id: 'testimonial-004',
    name: '鈴木 大介',
    company: 'スタートアップ tech++',
    position: 'CEO',
    avatar: '/images/testimonials/suzuki.jpg',
    rating: 5,
    category: 'value',
    product: '通常缶バッジ',
    testimonialText: 'コストを抑えながらも、品質は一流。スタートアップには厳しい予算でしたが、最適な提案をいただき、想像以上の仕上がりに。投資家へのプレゼンでも話題になり、ブランドイメージ向上に大きく貢献しました。',
    highlights: [
      'コストを抑えて一流品質',
      '予算に合わせた最適提案',
      'ブランドイメージ向上に貢献'
    ],
    orderDetails: {
      quantity: 300,
      deliveryTime: '5営業日',
      satisfaction: '想像以上の仕上がり'
    },
    date: '2024年6月8日',
    location: '神奈川県',
    isVerified: true,
    tags: ['コスパ最高', '最適提案', 'ブランド向上']
  },
  {
    id: 'testimonial-005',
    name: '加藤 麗子',
    company: 'NPO法人 地域づくり応援団',
    position: '事務局長',
    avatar: '/images/testimonials/kato.jpg',
    rating: 5,
    category: 'customer-service',
    product: 'オリジナル缶バッジ',
    testimonialText: '初めてのグッズ制作で不安でしたが、データ作成から納品まで丁寧にサポートしていただきました。専門用語も分かりやすく説明してくださり、安心してお任せできました。地域イベントでも大人気で、リピート確定です！',
    highlights: [
      '初心者にも丁寧なサポート',
      '分かりやすい専門説明',
      '地域イベントで大人気'
    ],
    orderDetails: {
      quantity: 150,
      deliveryTime: '8営業日',
      satisfaction: 'リピート確定'
    },
    date: '2024年5月20日',
    location: '埼玉県',
    isVerified: true,
    tags: ['丁寧サポート', '初心者安心', '地域貢献']
  },
  {
    id: 'testimonial-006',
    name: '伊藤 誠',
    company: 'デザイン事務所 COLORS',
    position: 'アートディレクター',
    avatar: '/images/testimonials/ito.jpg',
    rating: 5,
    category: 'overall',
    product: 'アクリルスタンド + 缶バッジセット',
    testimonialText: 'デザイナーの目線で見ても、技術力の高さが際立っています。色再現性、エッジの処理、表面の質感まで、すべてが計算されている。クライアントに自信を持って提案できる、真のパートナーです。次回も必ずお願いします。',
    highlights: [
      'デザイナーも認める技術力',
      '色再現性・質感まで完璧',
      'クライアントに自信提案'
    ],
    orderDetails: {
      quantity: 400,
      deliveryTime: '12営業日',
      satisfaction: '次回も必ずリピート'
    },
    date: '2024年6月5日',
    location: '千葉県',
    isVerified: true,
    tags: ['技術力', '色再現性', 'デザイナー推奨']
  }
]

export const testimonialStats: TestimonialStats = {
  averageRating: 4.9,
  totalReviews: 127,
  categoryBreakdown: [
    { category: 'quality', count: 45, averageRating: 4.9 },
    { category: 'delivery', count: 38, averageRating: 4.8 },
    { category: 'customer-service', count: 32, averageRating: 5.0 },
    { category: 'design', count: 28, averageRating: 4.9 },
    { category: 'value', count: 35, averageRating: 4.7 },
    { category: 'overall', count: 127, averageRating: 4.9 }
  ],
  satisfactionRate: 98.4
}

export const heroTestimonial: Testimonial = testimonialsData[2] // 山田あゆみさんの声をヒーローに

export const featuredTestimonials = testimonialsData.slice(0, 3)

export const inspiringQuotes = [
  {
    quote: "お客様の想いを形にする、それが私たちの使命です",
    author: "製造部門 スタッフ一同"
  },
  {
    quote: "一つひとつに込められた情熱を、技術で実現します",
    author: "品質管理責任者"
  },
  {
    quote: "お客様の笑顔が、私たちの最高の報酬です",
    author: "カスタマーサポート"
  }
]

// フィルタリング・検索関数
export function filterTestimonials(
  testimonials: Testimonial[], 
  category?: TestimonialCategory,
  searchQuery?: string
): Testimonial[] {
  let filtered = testimonials

  if (category && category !== 'overall') {
    filtered = filtered.filter(t => t.category === category)
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(t => 
      t.testimonialText.toLowerCase().includes(query) ||
      t.company.toLowerCase().includes(query) ||
      t.product.toLowerCase().includes(query) ||
      t.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
}

export function getTestimonialsByRating(minRating: number = 4): Testimonial[] {
  return testimonialsData.filter(t => t.rating >= minRating)
}

export function getRecentTestimonials(limit: number = 5): Testimonial[] {
  return testimonialsData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}