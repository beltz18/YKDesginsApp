import React                 from 'react'
import Link                  from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { removeCookie }      from './cookies'

const Navbar = ({ name, access }) => {
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
        <h5 className='user-name'>{ name }</h5>
        
        {
          access != 'admin'
            ?
          <button type='button' className='cart-icon' title='Carrito'>
            <AiOutlineShopping />
            <span className='cart-item-qty'>1</span>
          </button>
            :
          <Link href="/admin" className='user-name'>Admin panel</Link>
        }

        <button type='button' className='cart-icon' title='Cerrar sesión' onClick={ logout }>
          <AiOutlinePoweroff />
        </button>
      </div>
    </div>
  )
}

export default Navbar