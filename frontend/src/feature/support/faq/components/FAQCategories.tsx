"use client"

import { useState } from "react"
import { FAQCategory, FAQItem } from "../data/faqData"

interface FAQCategoriesProps {
  categories: FAQCategory[];
  faqs: FAQItem[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  onSearch: (query: string) => void;
}

export default function FAQCategories({ 
  categories, 
  faqs, 
  selectedCategory, 
  onCategorySelect,
  onSearch
}: FAQCategoriesProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const getCategoryFAQs = (categoryId: string) => {
    return faqs.filter(faq => faq.category === categoryId)
  }

  const displayedFAQs = selectedCategory 
    ? getCategoryFAQs(selectedCategory)
    : faqs

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* カテゴリー選択 */}
          <div className="text-center mb-12">
            {/* 検索フォーム */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="キーワードを入力して検索..."
                  className="w-full px-6 py-4 pl-14 text-lg border border-border/30 rounded-2xl bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                />
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors duration-300"
                >
                  検索
                </button>
              </div>
            </form>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => onCategorySelect(null)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === null
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-background border border-border/30 text-foreground hover:border-primary/50'
                }`}
              >
                すべて ({faqs.length})
              </button>
              {categories.map(category => {
                const categoryFAQs = getCategoryFAQs(category.id)
                return (
                  <button
                    key={category.id}
                    onClick={() => onCategorySelect(category.id)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-background border border-border/30 text-foreground hover:border-primary/50'
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    {category.name} ({categoryFAQs.length})
                  </button>
                )
              })}
            </div>
          </div>

          {/* FAQ一覧 */}
          <div className="space-y-4">
            {displayedFAQs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">該当するFAQが見つかりませんでした</h3>
                <p className="text-foreground/60">
                  別のキーワードで検索するか、お問い合わせフォームからご質問ください
                </p>
              </div>
            ) : (
              displayedFAQs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-background/80 backdrop-blur-sm rounded-2xl border border-border/20 overflow-hidden hover:border-primary/30 transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-card/20 transition-colors duration-300"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2 pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-foreground/60">
                        <span className="flex items-center gap-1">
                          <span className="text-base">
                            {categories.find(cat => cat.id === faq.category)?.icon}
                          </span>
                          {categories.find(cat => cat.id === faq.category)?.name}
                        </span>
                        {faq.popularity && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            人気度: {faq.popularity}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-300 ${
                      expandedItems.includes(faq.id) ? 'rotate-180' : ''
                    }`}>
                      <svg className="w-6 h-6 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    expandedItems.includes(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6">
                      <div className="bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm rounded-xl p-6 border border-border/30">
                        <p className="text-foreground/80 leading-relaxed mb-4">
                          {faq.answer}
                        </p>
                        
                        {faq.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {faq.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}