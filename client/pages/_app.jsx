import '@s/main.min.css'
import '@s/globals.min.css'
import React, { useState }         from 'react'
import { Toaster }   from 'react-hot-toast'
import { Layout }    from '@c/index'
import Cookies from 'js-cookie'

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(undefined)
  const [name,  setName]  = useState("")
  const tokenCookie       = Cookies.get('token')
  const nameCookie        = Cookies.get('name')
  
  setTimeout(() => {
    setToken(tokenCookie)
    setName(nameCookie)
  }, 1)

  return (
    <Layout token={ token } name={ name }>
      <Toaster position='top-right' toastOptions={{ duration: 5000 }} />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp