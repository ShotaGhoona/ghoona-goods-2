"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useNewsDetail, useRelatedNews } from "@/hooks/useNews"
import { getCategoryColor, formatNewsDate, formatReadTime, formatViewCount } from "@/constants/news"

interface NewsDetailProps {
  newsId: string
}

export default function NewsDetail({ newsId }: NewsDetailProps) {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  // Fetch news detail and related news
  const { news: newsData, loading, error, refetch, updateViewCount } = useNewsDetail(newsId)
  const { news: relatedNews, loading: relatedLoading } = useRelatedNews(newsId, 3)

  // Update view count when component mounts
  useEffect(() => {
    if (newsData) {
      updateViewCount()
    }
  }, [newsData, updateViewCount])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleBackClick = () => {
    router.back()
  }

  const handleRelatedNewsClick = (id: string) => {
    router.push(`/news/${id}`)
  }

  return (
    <div className="min-h-screen">
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-lg text-foreground/60">読み込み中...</div>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="container mx-auto max-w-4xl py-16 px-6">
          <div className="text-center">
            <div className="text-6xl mb-4">😓</div>
            <h2 className="text-2xl font-bold text-foreground mb-4">エラーが発生しました</h2>
            <p className="text-foreground/60 mb-6">{error}</p>
            <button 
              onClick={refetch}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              再試行
            </button>
          </div>
        </div>
      )}
      
      {/* News content */}
      {newsData && (
        <article className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            {/* Back button */}
            <button 
              onClick={handleBackClick}
              className="flex items-center gap-2 text-foreground/60 hover:text-foreground mb-8 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              ニュース一覧に戻る
            </button>

            {/* Article header */}
            <header className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-4 mb-6">
                <span className={`px-3 py-1 text-sm font-medium text-white rounded-full ${getCategoryColor(newsData.category)}`}>
                  {newsData.category}
                </span>
                <span className="text-sm text-foreground/50">{formatNewsDate(newsData.published_at)}</span>
                <span className="text-sm text-foreground/40">{formatReadTime(newsData.read_time_minutes)}</span>
                <span className="text-sm text-foreground/40">{formatViewCount(newsData.view_count)}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {newsData.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-foreground/60">
                <span>著者: {newsData.author}</span>
              </div>
            </header>

            {/* Featured image */}
            <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <img 
                src={newsData.featured_image_url || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop&crop=center"} 
                alt={newsData.featured_image_alt || newsData.title}
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>

            {/* Article content */}
            <div 
              className={`prose prose-lg max-w-none mb-12 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              dangerouslySetInnerHTML={{ __html: newsData.content || newsData.excerpt || "" }}
            />

            {/* Tags */}
            <div className={`mb-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h3 className="text-lg font-semibold text-foreground mb-4">タグ</h3>
              <div className="flex flex-wrap gap-2">
                {newsData.tags?.map((tag, index) => (
                  <span 
                    key={tag.id || index}
                    className="px-3 py-1 bg-card/50 text-foreground/70 rounded-full text-sm border border-border/30"
                  >
                    #{typeof tag === "string" ? tag : tag.tag_name}
                  </span>
                )) || (
                  newsData.tags && Array.isArray(newsData.tags) && newsData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-card/50 text-foreground/70 rounded-full text-sm border border-border/30"
                    >
                      #{typeof tag === "string" ? tag : tag.tag_name}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Share buttons */}
            <div className={`mb-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="relative bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-md rounded-3xl border border-border/30 p-8 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full blur-xl" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">この記事をシェア</h3>
                  </div>
                  
                  <p className="text-foreground/60 mb-8 leading-relaxed">
                    気に入った記事をSNSでシェアして、より多くの人に情報を届けましょう
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="group relative bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#1DA1F2]/20">
                      <div className="flex flex-col items-center gap-3">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        <span className="text-sm font-medium">Twitter</span>
                      </div>
                    </button>

                    <button className="group relative bg-[#4267B2] hover:bg-[#365899] text-white rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#4267B2]/20">
                      <div className="flex flex-col items-center gap-3">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span className="text-sm font-medium">Facebook</span>
                      </div>
                    </button>

                    <button className="group relative bg-[#00B900] hover:bg-[#009400] text-white rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00B900]/20">
                      <div className="flex flex-col items-center gap-3">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.628-.629.628M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391-.685.496-.879.619-1.273.344-.788.693-2.058.693-2.058s-.176-.353-.176-.873c0-.816.475-1.424 1.066-1.424.504 0 .746.378.746.831 0 .506-.323.994-.49 1.545-.139.586.294 1.065.891 1.065 1.07 0 1.891-1.133 1.891-2.777 0-1.451-1.043-2.467-2.532-2.467-1.724 0-2.738 1.295-2.738 2.633 0 .522.2 1.082.45 1.386.049.059.056.111.041.171-.045.188-.145.591-.164.674-.025.105-.081.127-.186.077-.693-.322-1.126-1.333-1.126-2.146 0-1.911 1.389-3.662 4.003-3.662 2.1 0 3.731 1.496 3.731 3.496 0 2.085-1.315 3.764-3.14 3.764-.613 0-1.191-.32-1.388-.695l-.378 1.438c-.137.523-.508 1.178-.756 1.575C9.845 23.764 10.899 24 12 24c6.624 0 12-4.371 12-9.686z"/>
                        </svg>
                        <span className="text-sm font-medium">LINE</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => navigator.clipboard.writeText(window.location.href)}
                      className="group relative bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">コピー</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related news */}
            {(relatedNews.length > 0 || relatedLoading) && (
              <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="relative bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-md rounded-3xl border border-border/30 p-8 overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 left-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-2 bg-secondary/10 rounded-xl">
                        <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">関連記事</h3>
                    </div>
                    
                    <p className="text-foreground/60 mb-8 leading-relaxed">
                      この記事に関連する他の記事もぜひご覧ください
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {relatedLoading ? (
                        <div className="col-span-2 text-center py-8">
                          <div className="text-foreground/60">関連記事を読み込み中...</div>
                        </div>
                      ) : relatedNews.length === 0 ? (
                        <div className="col-span-2 text-center py-8">
                          <div className="text-foreground/60">関連記事がありません</div>
                        </div>
                      ) : (
                        relatedNews.map((item, index) => (
                          <article 
                            key={item.id}
                            onClick={() => handleRelatedNewsClick(item.id)}
                            className="group cursor-pointer bg-background/50 backdrop-blur-sm rounded-2xl border border-border/40 overflow-hidden hover:bg-background/70 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
                            style={{ animationDelay: `${index * 150}ms` }}
                          >
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <span className={`px-3 py-1 text-xs font-medium text-white rounded-full ${getCategoryColor(item.category)}`}>
                                  {item.category}
                                </span>
                                <span className="text-sm text-foreground/50 font-light">{formatNewsDate(item.published_at)}</span>
                              </div>
                              
                              <h4 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-4 leading-tight">
                                {item.title}
                              </h4>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-primary font-medium text-sm group-hover:text-primary/80 transition-colors flex items-center gap-2">
                                  続きを読む
                                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </span>
                                
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-primary/40 rounded-full"></div>
                                  <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Hover effect line */}
                            <div className="h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                          </article>
                        ))
                      )}
                    </div>
                    
                    {/* More articles button */}
                    <div className="text-center mt-8">
                      <button 
                        onClick={() => router.push('/news')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-medium hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        すべての記事を見る
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>
      )}
    </div>
  )
}