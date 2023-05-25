import React from 'react'
import {
  Footer,
  Banner
} from '../components'

const Home = () => {
  return (
    <>
      <Banner />

      <div className="products-heading">
        <h2>Y&K Diseños</h2>
        <p>Encuentra el diseño adecuado a tu estilo</p>
      </div>

      <div className="products-container">
        {
          ['Product1', 'Product2'].map((product) => product)
        }
      </div>

      <Footer />
    </>
  )
}

export default Home