"use client"

import { useState } from "react"

interface ProductSelectorProps {
  selectedProduct: string
  onProductChange: (product: string) => void
}

export default function ProductSelector({ selectedProduct, onProductChange }: ProductSelectorProps) {
  const products = [
    {
      id: "original-badge",
      name: "オリジナル缶バッジ",
      description: "完全オリジナルデザイン"
    },
    {
      id: "standard-badge", 
      name: "通常缶バッジ",
      description: "スタンダードタイプ"
    },
    {
      id: "acrylic-stand",
      name: "アクリルスタンド", 
      description: "立体ディスプレイ"
    },
    {
      id: "acrylic-keychain",
      name: "アクリルキーホルダー",
      description: "携帯できるアクセサリー"
    }
  ]

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            商品を<span className="text-primary">選択</span>
          </h2>
          <p className="text-lg text-foreground/70">
            お求めの商品タイプを選択してください
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => onProductChange(product.id)}
              className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                selectedProduct === product.id
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20'
                  : 'border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50'
              }`}
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors ${
                  selectedProduct === product.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-foreground/10 text-foreground/60 group-hover:bg-primary/20'
                }`}>
                  {product.id === "original-badge" && (
                    <div className="w-8 h-8 rounded-full border-2 border-current"></div>
                  )}
                  {product.id === "standard-badge" && (
                    <div className="w-8 h-8 rounded-full bg-current"></div>
                  )}
                  {product.id === "acrylic-stand" && (
                    <div className="w-6 h-8 bg-current rounded-sm"></div>
                  )}
                  {product.id === "acrylic-keychain" && (
                    <div className="relative">
                      <div className="w-6 h-6 bg-current rounded-sm"></div>
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 border border-current rounded-full"></div>
                    </div>
                  )}
                </div>
                
                <h3 className={`text-lg font-bold mb-2 transition-colors ${
                  selectedProduct === product.id ? 'text-foreground' : 'text-foreground/80'
                }`}>
                  {product.name}
                </h3>
                
                <p className={`text-sm transition-colors ${
                  selectedProduct === product.id ? 'text-foreground/70' : 'text-foreground/50'
                }`}>
                  {product.description}
                </p>
              </div>

              {selectedProduct === product.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 border-2 border-primary-foreground rounded-sm transform rotate-45 border-t-0 border-r-0"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}