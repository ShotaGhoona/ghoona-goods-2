// "use client"

// import Link from "next/link"
// import { useEffect, useState } from "react"

// export default function HeroSection03() {
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-pink-950">
      
//       {/* カスケード型ジグザグライン */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(12)].map((_, i) => (
//           <div
//             key={`cascade-${i}`}
//             className={`absolute w-full h-1 transition-all duration-1500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
//             style={{
//               top: `${8 + i * 7}%`,
//               left: `${-20 + (i % 2) * 10}%`,
//               transform: `skewX(${30 - i * 2}deg)`,
//               animationDelay: `${i * 0.15}s`
//             }}
//           >
//             <div 
//               className={`h-full bg-gradient-to-r ${
//                 i % 5 === 0 ? 'from-pink-500 to-purple-500' :
//                 i % 5 === 1 ? 'from-purple-500 to-blue-500' :
//                 i % 5 === 2 ? 'from-blue-500 to-cyan-500' :
//                 i % 5 === 3 ? 'from-cyan-500 to-green-500' :
//                 'from-green-500 to-yellow-500'
//               } animate-pulse`}
//               style={{
//                 width: `${60 + i * 5}%`,
//                 animationDuration: `${2 + (i % 3)}s`,
//                 animationDelay: `${i * 0.3}s`,
//                 clipPath: 'polygon(0 0, 95% 0, 90% 100%, 5% 100%)'
//               }}
//             />
//           </div>
//         ))}
//       </div>

//       {/* ジグザグメッシュパターン */}
//       <div className="absolute inset-0 opacity-20">
//         <div className="grid grid-cols-12 gap-2 h-full w-full p-8">
//           {[...Array(144)].map((_, i) => (
//             <div
//               key={`mesh-${i}`}
//               className={`transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
//               style={{ animationDelay: `${(i % 12) * 0.05}s` }}
//             >
//               <div 
//                 className={`w-full h-4 bg-gradient-to-br ${
//                   i % 6 === 0 ? 'from-pink-400/30 to-purple-400/30' :
//                   i % 6 === 1 ? 'from-purple-400/30 to-blue-400/30' :
//                   i % 6 === 2 ? 'from-blue-400/30 to-cyan-400/30' :
//                   i % 6 === 3 ? 'from-cyan-400/30 to-green-400/30' :
//                   i % 6 === 4 ? 'from-green-400/30 to-yellow-400/30' :
//                   'from-yellow-400/30 to-orange-400/30'
//                 } transform ${
//                   i % 2 === 0 ? 'skew-x-12' : '-skew-x-12'
//                 } animate-pulse`}
//                 style={{
//                   animationDuration: `${1.5 + (i % 4) * 0.5}s`,
//                   animationDelay: `${(i % 8) * 0.1}s`
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 大型ジグザグシェイプ */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className={`absolute top-1/4 left-1/4 w-96 h-96 transition-all duration-2000 ${mounted ? 'opacity-30 scale-100' : 'opacity-0 scale-50'}`}>
//           <div className="relative w-full h-full animate-spin" style={{ animationDuration: '20s' }}>
//             {[...Array(6)].map((_, i) => (
//               <div
//                 key={`large-zigzag-${i}`}
//                 className={`absolute w-full h-8 bg-gradient-to-r from-purple-500/40 to-pink-500/40 origin-center`}
//                 style={{
//                   top: '50%',
//                   left: '50%',
//                   transform: `translate(-50%, -50%) rotate(${i * 60}deg)`,
//                   clipPath: 'polygon(10% 0%, 90% 0%, 80% 50%, 90% 100%, 10% 100%, 20% 50%)'
//                 }}
//               />
//             ))}
//           </div>
//         </div>
        
//         <div className={`absolute top-3/4 right-1/4 w-64 h-64 transition-all duration-2000 ${mounted ? 'opacity-25 scale-100' : 'opacity-0 scale-50'}`}>
//           <div className="relative w-full h-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
//             {[...Array(8)].map((_, i) => (
//               <div
//                 key={`medium-zigzag-${i}`}
//                 className={`absolute w-full h-4 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 origin-center`}
//                 style={{
//                   top: '50%',
//                   left: '50%',
//                   transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
//                   clipPath: 'polygon(5% 0%, 95% 0%, 85% 50%, 95% 100%, 5% 100%, 15% 50%)'
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* メインコンテンツ */}
//       <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
//         <div className={`transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
//           {/* ジグザグフレーム付きブランドロゴ */}
//           <div className="mb-12 relative">
//             <div className="relative inline-block p-8">
//               {/* ジグザグフレーム */}
//               <div className="absolute inset-0 border-4 border-transparent" 
//                    style={{
//                      background: 'linear-gradient(45deg, #8b5cf6, #ec4899, #06b6d4, #10b981) border-box',
//                      mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
//                      maskComposite: 'exclude',
//                      clipPath: 'polygon(5% 0%, 95% 0%, 100% 25%, 95% 50%, 100% 75%, 95% 100%, 5% 100%, 0% 75%, 5% 50%, 0% 25%)'
//                    }}>
//               </div>
              
//               <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-none relative">
//                 <span className="block">
//                   {['Z', 'I', 'G', 'Z', 'A', 'G'].map((letter, i) => (
//                     <span
//                       key={i}
//                       className={`inline-block text-transparent bg-clip-text bg-gradient-to-b from-pink-400 via-purple-400 to-blue-400`}
//                       style={{
//                         animation: `letterGlow 3s ease-in-out infinite`,
//                         animationDelay: `${i * 0.2}s`
//                       }}
//                     >
//                       {letter}
//                     </span>
//                   ))}
//                 </span>
//                 <span className="block text-white font-light mt-2">LAB</span>
//               </h1>
//             </div>
            
//             {/* 動的ジグザグライン */}
//             <div className="flex justify-center mt-4">
//               <svg width="400" height="30" className="overflow-visible">
//                 <path
//                   d="M20,15 L40,5 L60,25 L80,5 L100,25 L120,5 L140,25 L160,5 L180,25 L200,5 L220,25 L240,5 L260,25 L280,5 L300,25 L320,5 L340,25 L360,5 L380,15"
//                   stroke="url(#dynamicGradient)"
//                   strokeWidth="4"
//                   fill="none"
//                   className="animate-pulse"
//                 />
//                 <defs>
//                   <linearGradient id="dynamicGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                     <stop offset="0%" stopColor="#ec4899" />
//                     <stop offset="25%" stopColor="#8b5cf6" />
//                     <stop offset="50%" stopColor="#06b6d4" />
//                     <stop offset="75%" stopColor="#10b981" />
//                     <stop offset="100%" stopColor="#f59e0b" />
//                   </linearGradient>
//                 </defs>
//               </svg>
//             </div>
//           </div>
          
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
//             職人の技術が生み出す
//             <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
//               世界に一つだけの特別なグッズ
//             </span>
//           </h2>
//         </div>
        
//         <div className={`transition-all duration-1000 ease-out delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
//           <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
//             機構部品メーカーの精密技術による高品質製造
//             <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-cyan-300 font-semibold">
//               1個〜30万個まで対応
//             </span>
//           </p>
//         </div>

//         <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 ease-out delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
//           <button className="group relative px-12 py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-2xl font-bold text-xl overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50">
//             <span className="relative z-10">無料見積もりを始める</span>
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             <div className="absolute top-0 left-0 w-full h-full" 
//                  style={{
//                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
//                    transform: 'translateX(-100%)',
//                    animation: 'shimmer 2s infinite'
//                  }}>
//             </div>
//           </button>
//           <Link href="#portfolio" className="px-12 py-6 border-2 border-purple-400/50 text-purple-300 rounded-2xl font-bold text-xl hover:bg-purple-400/10 hover:border-purple-400 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-400/30 relative overflow-hidden">
//             実績を見る
//             <div className="absolute inset-0 border-2 border-transparent rounded-2xl hover:opacity-100"
//                  style={{
//                    background: 'linear-gradient(45deg, #ec4899, #8b5cf6, #06b6d4) border-box',
//                    mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
//                    maskComposite: 'exclude',
//                    opacity: 0,
//                    transition: 'opacity 0.3s'
//                  }}
//             </div>
//           </Link>
//         </div>
//       </div>

//       {/* ジグザグパーティクルスクロールインジケーター */}
//       <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
//         <div className="flex flex-col items-center space-y-4">
//           <div className="relative">
//             <div className="w-8 h-14 border-2 border-purple-400/40 rounded-full flex justify-center relative overflow-hidden">
//               <div className="w-2 h-6 bg-gradient-to-b from-pink-400 to-purple-400 rounded-full mt-2 animate-bounce"></div>
//               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/20 to-transparent animate-pulse"></div>
//             </div>
//             {/* 周囲のジグザグパーティクル */}
//             {[...Array(6)].map((_, i) => (
//               <div
//                 key={`particle-${i}`}
//                 className={`absolute w-1 h-1 bg-purple-400 rounded-full animate-ping`}
//                 style={{
//                   top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 25}px`,
//                   left: `${16 + Math.cos(i * 60 * Math.PI / 180) * 25}px`,
//                   animationDelay: `${i * 0.2}s`,
//                   animationDuration: '2s'
//                 }}
//               />
//             ))}
//           </div>
//           <p className="text-sm text-purple-300/80 font-medium tracking-wider">SCROLL</p>
//           <div className="flex space-x-1">
//             {[...Array(5)].map((_, i) => (
//               <div
//                 key={i}
//                 className={`w-1 h-6 bg-gradient-to-t ${
//                   i % 2 === 0 ? 'from-pink-400 to-purple-400' : 'from-purple-400 to-blue-400'
//                 } transform ${i % 2 === 0 ? 'skew-x-12' : '-skew-x-12'} animate-pulse`}
//                 style={{
//                   animationDelay: `${i * 0.1}s`,
//                   animationDuration: '1.5s'
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CSSアニメーション */}
//       <style jsx>{`
//         @keyframes letterGlow {
//           0%, 100% { filter: brightness(1) drop-shadow(0 0 5px currentColor); }
//           50% { filter: brightness(1.3) drop-shadow(0 0 15px currentColor); }
//         }
//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
//       `}</style>
//     </section>
//   )
// }