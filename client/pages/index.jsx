import React  from 'react'
import {
  Footer,
  Banner,
  Product,
  FooterBanner
} from '../components'
import axios from 'axios'

const Home = ({ product, banner, discounts }) => {
  return (
    <>
      <Banner banner={ banner.length && banner[0] } />

      <div className="products-heading">
        <h2>Productos en tendencia</h2>
        <p>Encuentra tu propio estilo</p>
      </div>

      <div className="products-container">
        { product?.map((product) => <Product key={product.id} product={product} />) }
      </div>

      <FooterBanner footerBanner={ discounts.length && discounts[0] } />
    </>
  )
}

export async function getServerSideProps () {
  const product   = await axios.get('http://127.0.0.1:5000/product/get/product/0')
  const banner    = await axios.get('http://127.0.0.1:5000/product/get/banner/0')
  const discounts = await axios.get('http://127.0.0.1:5000/product/get/discount/0')

  return {
    props: {
      product: product.data,
      banner: banner.data,
      discounts: discounts.data
    }
  }
}

export default Home