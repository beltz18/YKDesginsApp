import React                 from 'react'
import Link                  from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { removeCookie }      from './cookies'

const Navbar = ({ name }) => {
  const logout = () => {
    removeCookie('access')
    removeCookie('token')
    removeCookie('email')
    removeCookie('name')
    window.location.href = '/login'
  }

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">Y&K Diseños</Link>
      </p>

      <div>
        <h5>{ name }</h5>
        
        <button type='button' className='cart-icon' title='Carrito'>
          <AiOutlineShopping />
          <span className='cart-item-qty'>1</span>
        </button>

        <button type='button' className='cart-icon' title='Cerrar sesión' onClick={ logout }>
          <AiOutlinePoweroff />
        </button>
      </div>
    </div>
  )
}

export default Navbar