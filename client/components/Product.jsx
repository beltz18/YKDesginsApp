import React from 'react'
import Link  from 'next/link'
import Image from 'next/image'

const Product = ({ product: { id, image, name, price, details } }) => {
  return (
    <div>
      <Link href={`/product/${ id }`}>
        <Image
          src={ image[0] }
          width='250'
          height='250'
          alt='product'
          className='product-image'
        />
        <p className="product-name">{ name }</p>
        <p className="product-price">${ price }</p>
        <p className="product-details">{ details }</p>
      </Link>
    </div>
  )
}

export default Product