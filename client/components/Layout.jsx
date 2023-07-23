import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children, token, name }) => {
  if (typeof token != 'undefined') {
    return (
      <div className="layout">
        <Head>
          <title>Y&K Diseños</title>
        </Head>
        <header>
          <Navbar name={ name } />
        </header>
        <main className="main-container">
          { children }
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Y&K Diseños</title>
      </Head>
      { children }
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Layout