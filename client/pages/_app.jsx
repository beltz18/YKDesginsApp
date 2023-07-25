import '@s/main.min.css'
import '@s/globals.min.css'
import React, { useState }         from 'react'
import { Toaster }   from 'react-hot-toast'
import { Layout }    from '@c/index'
import Cookies from 'js-cookie'

function MyApp({ Component, pageProps }) {
  const [token, setToken]    = useState(undefined)
  const [name,  setName]     = useState("")
  const [access,  setAccess] = useState("")
  const [email,  setEmail]   = useState("")
  const tokenCookie          = Cookies.get('token')
  const nameCookie           = Cookies.get('name')
  const accessCookie         = Cookies.get('access')
  const emailCookie          = Cookies.get('email')
  
  setTimeout(() => {
    setToken(tokenCookie)
    setName(nameCookie)
    setAccess(accessCookie)
    setEmail(emailCookie)
  }, 1)

  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}`)

  return (
    <Layout token={ token } name={ name } access={ access } email={ email }>
      <Toaster position='top-right' toastOptions={{ duration: 5000 }} />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp