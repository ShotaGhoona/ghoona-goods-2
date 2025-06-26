"use client"

import { useState } from "react"
import ProductSelector from "./ProductSelector"
import ProductShowcase from "./ProductShowcase"

export default function RefinedProductContainer() {
  const [selectedProduct, setSelectedProduct] = useState("original-badge")

  return (
    <div>
      <ProductSelector 
        selectedProduct={selectedProduct} 
        onProductChange={setSelectedProduct} 
      />
      <ProductShowcase selectedProduct={selectedProduct} />
    </div>
  )
}