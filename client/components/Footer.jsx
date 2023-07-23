import React from 'react'
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <div className="footer-container">
      <br />
      .
      <br />
      <br />
      <p>{ year } Y&K Diseños - todos los derechos reservados</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer