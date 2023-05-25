import React from 'react'
import Link from 'next/link'

const Banner = () => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <h3>MID TEXT</h3>
        <h1>LARGE TEXT</h1>
        <img src='' alt='banner' className='hero-banner-image' />

        <div>
          <Link href="/product/id">
            <button type='button'>TEXT</button>
          </Link>

          <div className="desc">
            <h5>Description</h5>
            <p>DESCRIPTION</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner