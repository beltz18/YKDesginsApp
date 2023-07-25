import React                    from 'react'
import Link                     from 'next/link'
import { Button, TextInput }    from 'flowbite-react'
import { toast }                from 'react-hot-toast'
import { setCookie, getCookie } from '@c/cookies'

const LoginPage = () => {
  const notifyError  = (msg) => toast.error(msg)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {
      email:    e.target[0].value,
      password: e.target[1].value
    }

    const post = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_USER_LOG}`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })

    const res  = await post.json()
    if (!res.status) notifyError(res.message)
    else {
      setCookie('token',  res.token)
      setCookie('name',   res.data.name)
      setCookie('email',  res.data.email)
      setCookie('access', res.access)
      window.location = '/'
    }
  }

  return (
    <>
      <div className="min-h-screen py-6 flex flex-col justify-center xs:py-12 body">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto content">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-slate-100 shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto flex flex-col">
              <div>
                <h1 className="text-2xlg font-semibold text-center">Iniciar</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form className="py-8 text-base leading-6 space-y-4 text-gray-700 flex flex-col sm:text-lg sm:leading-7" onSubmit={ handleSubmit }>
                  <div>
                    <TextInput
                      type="email"
                      name="email"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Correo electrónico"
                      required
                    />
                  </div>
                  <div>
                    <TextInput
                      type="password"
                      name="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-5"
                      placeholder="Clave"
                      required
                    />
                  </div>
                  <Button type='submit' className="bg-blue-500 text-white rounded-md px-2 py-1">
                    Iniciar sesión
                  </Button>
                </form>
              </div>
              <Link className='m-auto' href="/register">Crear una cuenta</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage

export async function getServerSideProps ({ req }) {
  const token = getCookie('token', req)

  if (typeof token != 'undefined') {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}