import React from 'react'
import {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/favicon.ico' />
        <meta name='theme-color' content='#fff' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}