import React from 'react'
import Link  from 'next/link'

const FooterBanner = ({ footerBanner: { discount, largeText1, largeText2, saleTime, smallText, midText, description, product, buttonText, image } }) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{ discount }% off</p>
          <h3>{ largeText1 }</h3>
          <h3>{ largeText2 }</h3>
          <p>{ saleTime }</p>
        </div>

        <div className="right">
          <p>{ smallText }</p>
          <h3>{ midText }</h3>
          <p>{ description }</p>
          <Link href={`/product/${ product }`}>
            <button type="button">{ buttonText }</button>
          </Link>
        </div>

        <img 
          src={`/assets/${ image }`}
          alt='Product in discount'
          className="footer-banner-image"
        />
      </div>
    </div>
  )
}

export default FooterBanner