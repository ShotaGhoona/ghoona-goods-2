/**
 * News related constants and configurations
 */

// News categories with display information
export const NEWS_CATEGORIES = {
  ALL: 'all',
  NEW_PRODUCT: '新商品',
  ANNOUNCEMENT: 'お知らせ',
  CAMPAIGN: 'キャンペーン',
  TECHNOLOGY: '技術',
  EVENT: 'イベント',
} as const;

// Category display configurations
export const CATEGORY_CONFIG = {
  [NEWS_CATEGORIES.NEW_PRODUCT]: {
    id: NEWS_CATEGORIES.NEW_PRODUCT,
    name: '新商品',
    colorClass: 'bg-blue-500',
    description: '新製品の発表・紹介',
  },
  [NEWS_CATEGORIES.ANNOUNCEMENT]: {
    id: NEWS_CATEGORIES.ANNOUNCEMENT,
    name: 'お知らせ',
    colorClass: 'bg-green-500',
    description: '重要なお知らせ・連絡事項',
  },
  [NEWS_CATEGORIES.CAMPAIGN]: {
    id: NEWS_CATEGORIES.CAMPAIGN,
    name: 'キャンペーン',
    colorClass: 'bg-red-500',
    description: 'セール・キャンペーン情報',
  },
  [NEWS_CATEGORIES.TECHNOLOGY]: {
    id: NEWS_CATEGORIES.TECHNOLOGY,
    name: '技術',
    colorClass: 'bg-purple-500',
    description: '技術革新・品質向上の取り組み',
  },
  [NEWS_CATEGORIES.EVENT]: {
    id: NEWS_CATEGORIES.EVENT,
    name: 'イベント',
    colorClass: 'bg-orange-500',
    description: '展示会・イベント参加情報',
  },
} as const;

// News status constants
export const NEWS_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  SCHEDULED: 'scheduled',
  ARCHIVED: 'archived',
} as const;

// Sort options
export const NEWS_SORT_OPTIONS = {
  NEWEST: {
    value: 'published_at',
    order: 'desc' as const,
    label: '新しい順',
  },
  OLDEST: {
    value: 'published_at',
    order: 'asc' as const,
    label: '古い順',
  },
  POPULAR: {
    value: 'view_count',
    order: 'desc' as const,
    label: '人気順',
  },
  CREATED: {
    value: 'created_at',
    order: 'desc' as const,
    label: '作成順',
  },
} as const;

// Pagination defaults
export const NEWS_PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
  FEATURED_LIMIT: 4,
  LATEST_LIMIT: 6,
  RELATED_LIMIT: 3,
  HOMEPAGE_LIMIT: 6,
} as const;

// Filter defaults
export const NEWS_FILTER_DEFAULTS = {
  CATEGORY: NEWS_CATEGORIES.ALL,
  YEAR: 'all',
  SEARCH: '',
  FEATURED: undefined,
  SORT_BY: NEWS_SORT_OPTIONS.NEWEST.value,
  SORT_ORDER: NEWS_SORT_OPTIONS.NEWEST.order,
} as const;

// Image types
export const NEWS_IMAGE_TYPES = {
  FEATURED: 'featured',
  CONTENT: 'content',
  GALLERY: 'gallery',
} as const;

// API endpoints
export const NEWS_API_ENDPOINTS = {
  BASE: '/api/v1/news',
  HEALTH: '/api/v1/news/health',
  FEATURED: '/api/v1/news/featured',
  LATEST: '/api/v1/news/latest',
  CATEGORIES: '/api/v1/news/categories',
  CATEGORIES_FILTERS: '/api/v1/news/categories/filters',
  CATEGORIES_STATS: '/api/v1/news/categories/stats',
  META_YEARS: '/api/v1/news/meta/years',
} as const;

// Error messages
export const NEWS_ERROR_MESSAGES = {
  FETCH_FAILED: 'ニュースの取得に失敗しました',
  FETCH_DETAIL_FAILED: 'ニュース詳細の取得に失敗しました',
  FETCH_CATEGORIES_FAILED: 'カテゴリの取得に失敗しました',
  FETCH_YEARS_FAILED: '年度の取得に失敗しました',
  FETCH_STATS_FAILED: '統計情報の取得に失敗しました',
  LOAD_MORE_FAILED: '追加の読み込みに失敗しました',
  VIEW_UPDATE_FAILED: '閲覧数の更新に失敗しました',
  NOT_FOUND: 'ニュースが見つかりませんでした',
  NETWORK_ERROR: 'ネットワークエラーが発生しました',
} as const;

// Success messages
export const NEWS_SUCCESS_MESSAGES = {
  VIEW_UPDATED: '閲覧数を更新しました',
  ALREADY_VIEWED: '既に閲覧済みです',
  FETCHED: 'ニュース一覧を取得しました',
  DETAIL_FETCHED: 'ニュース詳細を取得しました',
  CATEGORIES_FETCHED: 'カテゴリ一覧を取得しました',
  YEARS_FETCHED: '利用可能な年度を取得しました',
  STATS_FETCHED: '統計情報を取得しました',
  RELATED_FETCHED: '関連記事を取得しました',
} as const;

// UI constants
export const NEWS_UI = {
  ANIMATION_DELAY_STEP: 100, // milliseconds between animations
  SEARCH_DEBOUNCE_MS: 300,
  EXCERPT_MAX_LENGTH: 150,
  TITLE_MAX_LENGTH: 100,
  TAG_MAX_COUNT: 10,
  IMAGES_MAX_COUNT: 20,
  READ_TIME_DEFAULT: 3,
  AUTHOR_DEFAULT: 'Ghoona Goods',
  VIEW_COUNT_THRESHOLD: 1000, // Show "1k views" instead of "1000 views"
} as const;

// Helper functions
export const getCategoryColor = (category: string): string => {
  return CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG]?.colorClass || 'bg-gray-500';
};

export const getCategoryName = (category: string): string => {
  return CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG]?.name || category;
};

export const getCategoryDescription = (category: string): string => {
  return CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG]?.description || '';
};

export const formatViewCount = (count: number): string => {
  if (count >= NEWS_UI.VIEW_COUNT_THRESHOLD) {
    return `${Math.floor(count / 1000)}k views`;
  }
  return `${count} views`;
};

export const formatReadTime = (minutes: number): string => {
  return `${minutes}分で読める`;
};

export const formatNewsDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

// Validation constants
export const NEWS_VALIDATION = {
  SEARCH_MIN_LENGTH: 1,
  SEARCH_MAX_LENGTH: 100,
  YEAR_MIN: 2020,
  YEAR_MAX: new Date().getFullYear() + 1,
  PAGE_MIN: 1,
  PAGE_SIZE_MIN: 1,
  PAGE_SIZE_MAX: NEWS_PAGINATION.MAX_PAGE_SIZE,
} as const;

// Type guards
export const isValidCategory = (category: string): boolean => {
  return Object.values(NEWS_CATEGORIES).includes(category as any);
};

export const isValidSortBy = (sortBy: string): boolean => {
  return Object.values(NEWS_SORT_OPTIONS).some(option => option.value === sortBy);
};

export const isValidSortOrder = (order: string): boolean => {
  return order === 'asc' || order === 'desc';
};

export const isValidYear = (year: number): boolean => {
  return year >= NEWS_VALIDATION.YEAR_MIN && year <= NEWS_VALIDATION.YEAR_MAX;
};