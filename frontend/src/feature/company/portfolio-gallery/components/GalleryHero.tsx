"use client"

import { useEffect, useState } from "react"

export default function GalleryHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-primary/5 pt-20">
      {/* 背景パターン */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-32 w-32 h-32 bg-secondary rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className={`transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-foreground mb-8 leading-tight tracking-tight">
            製造<span className="font-bold text-primary">実績</span>
          </h1>
        </div>
        
        <div className={`transition-all duration-1000 ease-out delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            機構部品メーカーの技術力で生み出された、
            <br />
            <span className="text-primary font-medium">数々の作品をご覧ください。</span>
          </p>
        </div>
      </div>
    </section>
  )
}