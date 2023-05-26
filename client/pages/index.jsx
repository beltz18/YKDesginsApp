import React , { useEffect, useState } from 'react'
import {
  Footer,
  Banner,
  Product,
  FooterBanner
} from '../components'
import axios from 'axios'

const Home = () => {
  const [product, setProduct]     = useState([])
  const [banner, setBanner]       = useState([])
  const [discounts, setDiscounts] = useState([])

  console.log(product)
  
  useEffect(() => {
    axios.get('http://localhost:5000/product/get/product/0')
      .then(res => setProduct(res.data))
    axios.get('http://localhost:5000/product/get/banner/0')
      .then(res => setBanner(res.data))
    axios.get('http://localhost:5000/product/get/discount/0')
      .then(res => setDiscounts(res.data))
  })
  
  return (
    <>
      <Banner banner={ banner.length && banner[0] } />

      <div className="products-heading">
        <h2>Y&K Diseños</h2>
        <p>Encuentra tu propio estilo</p>
      </div>

      <div className="products-container">
        { product?.map((product) => <Product key={product.id} product={product} />) }
      </div>

      <FooterBanner footerBanner={ discounts.length && discounts[0] } />

      <Footer />
    </>
  )
}

export default Home