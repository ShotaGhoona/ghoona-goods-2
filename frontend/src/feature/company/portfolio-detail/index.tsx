"use client"

import { useRouter } from "next/navigation"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import GalleryDetailHero from "./components/GalleryDetailHero"
import GalleryDetailSpecs from "./components/GalleryDetailSpecs"
import GalleryDetailProcess from "./components/GalleryDetailProcess"
import GalleryDetailCTA from "./components/GalleryDetailCTA"
import { usePortfolioDetail } from "@/hooks/usePortfolio"

interface GalleryDetailProps {
  id: string
}

export default function GalleryDetail({ id }: GalleryDetailProps) {
  const router = useRouter()
  const { portfolio: item, loading, error } = usePortfolioDetail(id)

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-foreground/60">実績詳細を読み込み中...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="text-6xl text-red-500/20 mb-4">⚠️</div>
            <h2 className="text-2xl font-medium text-foreground mb-4">
              データの読み込みに失敗しました
            </h2>
            <p className="text-foreground/60 mb-6">
              {error}
            </p>
            <div className="space-x-4">
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                再試行
              </button>
              <button 
                onClick={() => router.push('/gallery')}
                className="px-6 py-3 bg-card border border-border text-foreground rounded-xl font-medium hover:bg-card/80 transition-colors"
              >
                実績一覧に戻る
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="text-6xl text-foreground/20 mb-4">😔</div>
            <h2 className="text-2xl font-medium text-foreground mb-4">
              実績が見つかりませんでした
            </h2>
            <p className="text-foreground/60 mb-6">
              指定された実績は存在しないか、削除された可能性があります。
            </p>
            <button 
              onClick={() => router.push('/gallery')}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              実績一覧に戻る
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <GalleryDetailHero item={item} />
      <GalleryDetailSpecs item={item} />
      <GalleryDetailProcess item={item} />
      <GalleryDetailCTA />
      <Footer />
    </div>
  )
}