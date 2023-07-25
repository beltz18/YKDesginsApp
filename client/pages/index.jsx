import React  from 'react'
import {
  Banner,
  Product,
  FooterBanner
} from '../components'
import axios         from 'axios'
import { getCookie } from '@c/cookies'

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

export async function getServerSideProps ({ req }) {
  const product   = await axios.get('http://127.0.0.1:5000/product/get/product/0')
  const productD  = await axios.get('http://127.0.0.1:5000/product/data')
  const banner    = await axios.get('http://127.0.0.1:5000/product/get/banner/0')
  const discounts = await axios.get('http://127.0.0.1:5000/product/get/discount/0')

  const token = getCookie('token', req)

  if (typeof token == 'undefined') {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      product: [...product.data, ...productD.data.data],
      banner: banner.data,
      discounts: discounts.data
    }
  }
}

export default Home