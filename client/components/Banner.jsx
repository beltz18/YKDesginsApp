import React from 'react'
import Link  from 'next/link'
import Image from 'next/image'

const Banner = ({ banner: { id, smallText, midText, largeText, image, buttonText, description } }) => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{ smallText }</p>
        <h3>{ midText }</h3>
        <h1>{ largeText }</h1>
        <Image src={`/assets/${ image }`} width='300' height='300' alt='banner' className='hero-banner-image' />

        <div>
          <Link href={`/product/${ id }`}>
            <button type='button'>{ buttonText }</button>
          </Link>

          <div className="desc">
            <h5>Description</h5>
            <p>{ description }</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner