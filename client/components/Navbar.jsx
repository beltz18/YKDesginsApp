import React, { useState, useEffect } from 'react'
import Link                           from 'next/link'
import { AiOutlineShopping }          from 'react-icons/ai'
import { AiOutlinePoweroff }          from 'react-icons/ai'
import { removeCookie }               from './cookies'

const Navbar = ({ name, access, email }) => {
  // const [qty, setQty]   = useState(0)
  // const [cart, setCart] = useState([])

  // const fetcher = async () => {
  //   await fetch('http://127.0.0.1:5000/cart/get', {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email })
  //   }).then(res => res.json())
  //   console.log(res)
  // }

  // useEffect(() => {
  //   fetcher()
  // }, [])

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