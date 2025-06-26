"use client"

import { useState } from "react"
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import GalleryHero from "./components/GalleryHero";
import GalleryFilter from "./components/GalleryFilter";
import GalleryGrid from "./components/GalleryGrid";
import GalleryStats from "./components/GalleryStats";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen">
      <Header />
      <GalleryHero />
      <GalleryStats />
      <GalleryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        selectedIndustry={selectedIndustry}
        onIndustryChange={setSelectedIndustry}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <GalleryGrid 
        selectedCategory={selectedCategory}
        selectedYear={selectedYear}
        selectedIndustry={selectedIndustry}
        searchTerm={searchTerm}
      />
      <Footer />
    </div>
  );
}