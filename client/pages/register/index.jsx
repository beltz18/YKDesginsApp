import React                   from 'react'
import Link                    from 'next/link'
import { Button, TextInput }   from 'flowbite-react'
import { toast }               from 'react-hot-toast'

const RegisterPage = () => {
  const regexEmail   = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
  const regexPass    = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
  const notifyError  = (msg) => toast.error(msg)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {
      name:     e.target[0].value,
      email:    e.target[1].value,
      password: e.target[2].value,
      access:   "user"
    }
    
    if(!user.email.match(regexEmail)) notifyError(`
      El correo no puede empezar por un punto, ni contener espacios
      o caracteres especiales como '<>:*'
    `)

    else if(!user.password.match(regexPass)) notifyError(`
      La clave debe tener una longitud de 8 - 16 caracteres,
      sin espacios y contener: 1 espacio, 1 letra mayúscula,
      1 letra minúscula y 1 caracter especial
    `)

    else {
      const post = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_USER_REG}`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
      const res  = await post.json()
      if (!res.status) notifyError(res.message)
      else window.location = '/login'
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-500 py-6 flex flex-col justify-center xs:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto content">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto flex flex-col">
              <div>
                <h1 className="text-2xlg font-semibold text-center">Registro</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form className="py-8 text-base leading-6 space-y-4 text-gray-700 flex flex-col sm:text-lg sm:leading-7" onSubmit={ handleSubmit }>
                  <div>
                    <TextInput
                      type="text"
                      name="name"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Nombre completo"
                      required
                    />
                  </div>
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
                    Crear cuenta
                  </Button>
                </form>
              </div>
              <Link className='m-auto' href="/login">Iniciar sesión</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage