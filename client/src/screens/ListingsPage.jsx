import React from 'react'
import ProductCard from '../components/ProductCard'

const ListingsPage = () => {
  return (
    <div className="mx-2 grid grid-cols-1 mini:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
  )
}

export default ListingsPage