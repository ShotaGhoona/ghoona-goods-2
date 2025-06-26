"use client"

import { useState, useEffect } from "react"

interface HeroProps {
  title: string
  titleHighlight?: string
  subtitle?: string
  description?: string
  backgroundVariant?: 'default' | 'primary' | 'secondary' | 'gradient'
  size?: 'small' | 'medium' | 'large'
  actions?: React.ReactNode
  centerContent?: boolean
  className?: string
}

export default function Hero({
  title,
  titleHighlight,
  subtitle,
  description,
  backgroundVariant = 'default',
  size = 'medium',
  actions,
  centerContent = true,
  className = ""
}: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const sizeClasses = {
    small: "py-16 min-h-[40vh]",
    medium: "py-20 min-h-[60vh]",
    large: "py-24 min-h-[70vh]"
  }

  const backgroundClasses = {
    default: "bg-gradient-to-br from-primary/5 via-background to-secondary/5",
    primary: "bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5",
    secondary: "bg-gradient-to-br from-secondary/20 via-secondary/10 to-secondary/5",
    gradient: "bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10"
  }

  const titleSizes = {
    small: "text-3xl md:text-4xl",
    medium: "text-4xl md:text-5xl lg:text-6xl",
    large: "text-5xl md:text-6xl lg:text-7xl"
  }

  return (
    <section 
      className={`${sizeClasses[size]} ${backgroundClasses[backgroundVariant]} flex items-center justify-center relative overflow-hidden ${className}`}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-24 h-24 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`max-w-4xl mx-auto ${centerContent ? 'text-center' : ''}`}>
          {/* Title */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className={`${titleSizes[size]} font-light text-foreground mb-6 leading-tight`}>
              {title}
              {titleHighlight && (
                <span className="font-bold text-primary ml-2">{titleHighlight}</span>
              )}
            </h1>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-lg md:text-xl text-primary font-medium mb-6">
                {subtitle}
              </p>
            </div>
          )}

          {/* Description */}
          {description && (
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-base md:text-lg text-foreground/70 mb-8 leading-relaxed max-w-3xl mx-auto">
                {description}
              </p>
            </div>
          )}

          {/* Actions */}
          {actions && (
            <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {actions}
            </div>
          )}

          {/* Decorative Line */}
          <div className={`flex justify-center space-x-2 mt-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="h-1 w-12 bg-primary rounded-full"></div>
            <div className="h-1 w-8 bg-primary/60 rounded-full"></div>
            <div className="h-1 w-4 bg-primary/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/6 right-1/12 w-2 h-2 bg-primary/30 rounded-full animate-bounce"></div>
        <div className="absolute top-2/3 left-1/12 w-1.5 h-1.5 bg-secondary/30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/6 right-1/6 w-1 h-1 bg-primary/20 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
      </div>
    </section>
  )
}