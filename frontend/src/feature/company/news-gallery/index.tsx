"use client"

import { useState } from "react"
import NewsHero from "./components/NewsHero";
import NewsFilter from "./components/NewsFilter";
import NewsGrid from "./components/NewsGrid";

export default function NewsGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen">
      <NewsHero />
      <NewsFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <NewsGrid 
        selectedCategory={selectedCategory}
        selectedYear={selectedYear}
        searchTerm={searchTerm}
      />
    </div>
  );
}