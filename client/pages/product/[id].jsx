import React, { useState } from 'react'
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar
} from 'react-icons/ai'
import { Product }   from '../../components'
import axios         from 'axios'
import { getCookie } from '@r/components/cookies'

const PoductDetails = ({ product: { image, name, price, details }, products }) => {
  const [index, setIndex] = useState(0)

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img src={`/assets/${ image && image[index] }`} className='product-detail-image' alt="Product image" />
          </div>
          <div className="small-images-container">
            {
              image.map((image, i) => (
                <img
                  key={ i }
                  src={ image }
                  alt="Product image"
                  className={i === index ? 'small-image selected-image' : 'small-image'}
                  onMouseEnter={() => setIndex(i)}
                />
              ))
            }
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{ name }</h1>

          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>20</p>
          </div>
          <h4>Detalles:</h4>
          <p>{ details }</p>
          <p className='price'>${ price }</p>
          <div className="quantity">
            <h3>Cantidad:</h3>
            <p className="quantity-desc">
              <span className='minus' onClick=""><AiOutlineMinus /></span>
              <span className='num' onClick="">0</span>
              <span className='plus' onClick=""><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type='button' className='add-to-cart' onClick="">Agregar al carro</button>
            <button type='button' className='buy-now' onClick="">Comprar</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>Tambien te podría gustar</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {
              products.map((item) => (
                <Product key={item.id} product={item} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps ({ params: { id }, req }) {
  const product  = await axios.get(`http://127.0.0.1:5000/product/get/product/${id}`)
  const products = await axios.get('http://127.0.0.1:5000/product/get/product/0')

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
      product: product.data,
      products: products.data
    }
  }
}

export default PoductDetails