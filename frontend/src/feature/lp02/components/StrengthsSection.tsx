"use client"

import { useEffect, useState } from "react"

export default function StrengthsSection() {
  const [isVisible, setIsVisible] = useState(false)

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

    const section = document.getElementById('strengths-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const strengths = [
    {
      id: 1,
      category: "🇯🇵 Made in JAPAN",
      title: "自社一貫生産",
      subtitle: "材料から国産にこだわったオールジャパンのモノづくり",
      description: "材料から国産にこだわったオールジャパンのモノづくり。自社工場での一貫生産により高い品質を保証します。",
      bgGradient: "from-red-500/30 via-white/40 to-red-500/30",
      borderColor: "border-red-500/50",
      hoverBg: "hover:bg-red-50/80",
      accentColor: "text-red-700",
      icon: (
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 via-white to-red-500 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-red-600/30">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8" viewBox="0 0 512 512" fill="currentColor">
                <path d="M477.336,118.683l-150.39,106.525V118.683L170.01,229.844L156.936,27.133H26.147L0,484.867h512 L477.336,118.683z M194.65,369.543h-61.77v-61.779h61.77V369.543z M370.108,369.543H308.32v-61.779h61.788V369.543z" fill="#40C7A4" />
              </svg>
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-6 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-xs font-bold">🇯🇵</span>
          </div>
          <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-red-300/70 rounded-full blur-md animate-pulse"></div>
          <div className="absolute top-0 left-0 w-6 h-6 bg-white/80 rounded-full animate-ping"></div>
        </div>
      ),
      delay: "0s"
    },
    {
      id: 2,
      category: "📊 １～３０万個",
      title: "どんな数量でも対応",
      subtitle: "オンデマンド印刷機の導入によって柔軟に対応",
      description: "オンデマンド印刷機の導入によって、小ロットの生産から大量生産まで幅広く対応いたします。",
      bgGradient: "from-blue-500/30 via-cyan-400/20 to-blue-600/30",
      borderColor: "border-blue-500/50",
      hoverBg: "hover:bg-blue-50/80",
      accentColor: "text-blue-700",
      icon: (
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8" viewBox="0 0 512 512" fill="currentColor">
                <path d="M255.987,18.171L142.352,61.122L89.121,81.226L0,114.966v68.059V397.06l255.987,96.768l6.23-2.35L512,397.042 V114.949L255.987,18.171z M244.22,451.679L35.28,372.7V183.025v-43.698l57.013-21.588v61.757l59.358-8.408V95.323l3.168-1.197 l89.4-33.778V451.679z M476.72,372.673l-208.976,79.006V60.348l208.976,78.979V372.673z" fill="#40C7A4" />
              </svg>
            </div>
          </div>
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1.5 rounded-full shadow-lg">
            <span className="text-white text-xs font-bold">∞</span>
          </div>
          <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-cyan-300/70 rounded-full blur-md animate-pulse"></div>
          <div className="absolute top-1 right-1 w-3 h-3 bg-white/60 rounded-full animate-ping"></div>
        </div>
      ),
      delay: "0.2s"
    },
    {
      id: 3,
      category: "📦 商品＋パッケージ",
      title: "ワンストップで完結",
      subtitle: "グッズ本体から外箱まで自社で内製",
      description: "グッズ本体の生産だけでなく、商品の個包装から外箱のパッケージまで自社での内製が可能です。",
      bgGradient: "from-emerald-500/30 via-green-400/20 to-emerald-600/30",
      borderColor: "border-emerald-500/50",
      hoverBg: "hover:bg-emerald-50/80",
      accentColor: "text-emerald-700",
      icon: (
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8" viewBox="0 0 512 512" fill="currentColor">
                <rect x="168.084" y="335.709" width="175.831" height="20.29" fill="#40C7A4" />
                <rect x="168.084" y="387.871" width="175.831" height="20.29" fill="#40C7A4" />
                <rect x="168.084" y="434.242" width="83.085" height="20.29" fill="#40C7A4" />
                <path d="M488.338,163.731c-8.009-8.029-19.199-13.028-31.44-13.028h-47.304V78.276L331.319,0h-4.798H102.405v150.703 H55.102c-12.253,0-23.44,5-31.448,13.028c-8.02,8.013-13.02,19.199-13.012,31.436v169.958 c-0.008,12.245,4.983,23.432,13.012,31.453c8.017,8.012,19.208,13.02,31.448,13.004h47.303V512h307.189V409.582h47.304 c12.233,0.016,23.419-4.992,31.428-13.004c8.033-7.996,13.04-19.2,13.033-31.453V195.168 C501.366,182.922,496.359,171.744,488.338,163.731z M324.587,26.048l57.024,57.041h-57.024V26.048z M386.409,488.819H125.59V398 h-0.012v-94.655H386.4v106.238h0.008V488.819z M335.813,230.287c0-9.216,7.475-16.679,16.675-16.679 c9.216,0,16.679,7.463,16.679,16.679c0,9.208-7.463,16.671-16.679,16.671C343.289,246.958,335.813,239.495,335.813,230.287z M386.409,150.703H125.59V23.189h175.811v83.074h85.007V150.703z M423.467,246.958c-9.204,0-16.667-7.463-16.667-16.671 c0-9.216,7.463-16.679,16.667-16.679c9.212,0,16.675,7.463,16.675,16.679C440.142,239.495,432.679,246.958,423.467,246.958z" fill="#40C7A4" />
              </svg>
            </div>
          </div>
          <div className="absolute -top-3 -left-3 w-8 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg transform rotate-12 shadow-md flex items-center justify-center">
            <span className="text-white text-xs">📋</span>
          </div>
          <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-emerald-300/70 rounded-full blur-md animate-pulse"></div>
          <div className="absolute top-1 right-1 w-3 h-3 bg-white/60 rounded-full animate-ping"></div>
        </div>
      ),
      delay: "0.4s"
    }
  ]

  return (
    <section 
      id="strengths-section"
      className="py-20 px-4 bg-gradient-to-b from-background to-background/50"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              ZIGZAGLabの<span className="text-primary">強み</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              機構部品メーカーとして培った技術力と品質管理で、お客様のアイディアを最高の形で実現します。
            </p>
          </div>
        </div>

        {/* Strengths Grid - Completely Redesigned */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 lg:gap-10">
          {strengths.map((strength) => (
            <div
              key={strength.id}
              className={`group transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: isVisible ? strength.delay : '0s' 
              }}
            >
              <div className={`relative overflow-hidden bg-gradient-to-br ${strength.bgGradient} backdrop-blur-xl border-2 ${strength.borderColor} rounded-[2rem] p-8 ${strength.hoverBg} hover:border-opacity-80 transition-all duration-700 hover:shadow-3xl hover:shadow-black/20 hover:-translate-y-6 group-hover:scale-105 cursor-pointer`}>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full transform translate-x-20 -translate-y-20 group-hover:translate-x-16 group-hover:-translate-y-16 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full transform -translate-x-16 translate-y-16 group-hover:-translate-x-12 group-hover:translate-y-12 transition-transform duration-700"></div>
                  <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-white/50 rounded-full transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                </div>
                {/* Icon */}
                <div className="relative mb-8 flex justify-center">
                  <div className="transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-700">
                    {strength.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative space-y-6 text-center">
                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight group-hover:scale-105 transition-transform duration-500">
                      {strength.title}
                    </h3>
                    {/* <p className={`text-lg font-bold ${strength.accentColor} tracking-wide`}>
                      {strength.subtitle}
                    </p> */}
                  </div>
                  
                  <p className="text-sm text-gray-700 leading-relaxed opacity-90">
                    {strength.description}
                  </p>
                 {/* Category Badge */}
                  <div className="relative mb-6">
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                      <span className="text-sm font-bold text-white">{strength.category}</span>
                    </div>
                </div>
                </div>

                {/* Interactive Bottom Element */}
                <div className="relative mt-8 flex justify-center">
                  <div className="h-2 w-20 bg-gradient-to-r from-white/40 via-white/60 to-white/40 rounded-full group-hover:w-32 group-hover:h-3 transition-all duration-700 group-hover:shadow-lg"></div>
                </div>

                {/* Floating Interactive Elements */}
                <div className="absolute top-6 right-6 w-3 h-3 bg-white/40 rounded-full group-hover:scale-200 group-hover:bg-white/60 transition-all duration-700"></div>
                <div className="absolute bottom-8 left-6 w-2 h-2 bg-white/30 rounded-full group-hover:scale-150 group-hover:bg-white/50 transition-all duration-700"></div>
                <div className="absolute top-1/2 right-4 w-1.5 h-1.5 bg-white/20 rounded-full group-hover:scale-300 transition-all duration-700"></div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-white/5 via-white/10 to-white/5"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Next-Level Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/6 left-1/12 w-60 h-60 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-red-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/6 right-1/12 w-48 h-48 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-blue-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-gradient-to-r from-purple-500/10 via-blue-500/15 to-cyan-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        </div>
      </div>
    </section>
  )
}