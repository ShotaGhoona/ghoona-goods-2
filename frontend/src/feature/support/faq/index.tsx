"use client"

import { useState, useEffect } from "react"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import FAQHero from "./components/FAQHero"
import FAQCategories from "./components/FAQCategories"
import FAQContact from "./components/FAQContact"
import { faqCategories, faqData, searchFAQs, FAQItem } from "./data/faqData"

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<FAQItem[]>(faqData)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setSearchResults(faqData)
      setIsSearching(false)
      setSelectedCategory(null)
    } else {
      const results = searchFAQs(query)
      setSearchResults(results)
      setIsSearching(true)
      setSelectedCategory(null)
    }
  }

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
    setIsSearching(false)
    setSearchResults(faqData)
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* ヒーローセクション */}
        <FAQHero onSearch={handleSearch} />
        
        {/* カテゴリー別FAQ */}
        <FAQCategories
          categories={faqCategories}
          faqs={searchResults}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        
        {/* お問い合わせ誘導 */}
        <FAQContact />
      </main>
      
      <Footer />
    </div>
  )
}