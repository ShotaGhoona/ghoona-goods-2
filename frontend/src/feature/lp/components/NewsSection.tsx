"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useLatestNews } from "@/hooks/useNews"
import { getCategoryColor, formatNewsDate } from "@/constants/news"

export default function RefinedNewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Fetch latest news for homepage
  const { news: newsItems, loading, error } = useLatestNews(6)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('news-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollPosition = 0
    const scrollSpeed = 0.15

    const animate = () => {
      scrollPosition += scrollSpeed
      
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }
      
      scrollContainer.scrollLeft = scrollPosition
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId)
    }

    const handleMouseLeave = () => {
      requestAnimationFrame(animate)
    }

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])


  return (
    <section 
      id="news-section"
      className="py-24 bg-gradient-to-b from-background to-primary/2"
    >
      <div className="">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-5xl md:text-6xl font-light text-foreground mb-6">
            最新<span className="font-bold text-primary">ニュース</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
            Ghoona Goodsの最新情報をお届けします
          </p>
          {loading && (
            <p className="text-sm text-foreground/40 mt-4">ニュースを読み込み中...</p>
          )}
          {error && (
            <p className="text-sm text-red-500 mt-4">ニュースの読み込みに失敗しました</p>
          )}
        </div>

        <div 
          ref={scrollRef}
          className="overflow-hidden cursor-pointer"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-6" style={{ width: 'fit-content' }}>
            {newsItems.length > 0 && [...newsItems, ...newsItems].map((item, index) => (
              <div 
                key={`${item.id}-${index}`}
                className={`flex-shrink-0 w-80 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/20 overflow-hidden hover:bg-card/50 hover:border-primary/20 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.featured_image_url || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center"} 
                    alt={item.featured_image_alt || item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-medium text-white rounded-full ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-foreground/50 mb-2 font-light">{formatNewsDate(item.published_at)}</p>
                  <h3 className="text-lg font-medium text-foreground mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/70 line-clamp-3 leading-relaxed font-light">
                    {item.excerpt}
                  </p>
                  <Link href={`/news/${item.id}`} className="mt-4 text-primary font-medium text-sm hover:text-primary/80 transition-colors inline-block">
                    続きを読む →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/news"
            className="px-8 py-4 border border-primary/30 text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            すべてのニュースを見る
          </Link>
        </div>
      </div>
    </section>
  )
}