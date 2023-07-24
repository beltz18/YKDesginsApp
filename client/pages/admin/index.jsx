import React         from 'react'
import { toast }     from 'react-hot-toast'
import { getCookie } from '@r/components/cookies'

const ProductForm = () => {
  const notifySuccess = (msg) => toast.success(msg)
  const notifyError   = (msg) => toast.error(msg)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const product = {
      name:        e.target[0].value,
      price:       e.target[1].value,
      quantity:    e.target[2].value,
      description: e.target[3].value,
      category:    e.target[4].value,
    }

    const form = e.currentTarget
    const file = Array.from(form.elements).find(({ type }) => type === 'file')
    
    const formData = new FormData()
    for (const dataFile of file.files) { formData.append('file', dataFile) }
    formData.append('upload_preset', 'crazyShop_uploads')

    const data = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY}`, {
      method: 'POST',
      body: formData
    }).then(res => res.json())
    
    product['img'] = data.secure_url
    const body = { product }

    const newPrd = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_PRODUCT_REG}`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(res => res.json())
    
    if (newPrd.status == 201) { 
      notifySuccess(newPrd.message)
      e.target.reset()
    } 
    else notifyError(newPrd.message) 
  }

  return (
    <>
      <div className='min-h-screen bg-gray-500 py-6 flex flex-col justify-center xs:py-12'>
        <div className='relative py-32 sm:max-w-xl sm:mx-auto content'>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div>
              <h1 className="text-2xlg font-semibold text-center">Nuevo producto</h1>
            </div>
            <div className="divide-y divide-gray-200 my-10">
              <form id='form' onSubmit={ handleSubmit }>
                <div className="mb-6">
                  <input type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Nombre" required />
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="mb-6">
                    <input type="number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" min={0} placeholder="Precio" required />
                  </div>
                  <div className="mb-6">
                    <input type="number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" min={0} placeholder="Cantidad" required />
                  </div>
                </div>
                <div className="mb-6">
                  <input type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='Descripción' required />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">-- Categoría --</label>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Technology</option>
                    <option>Video Games</option>
                    <option>Entertainment</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="mb-6">
                  <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file"></input>
                </div>
                <div className="mb-6 flex justify-center items-center">
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar producto</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className='relative py-32 sm:max-w-xl sm:mx-auto content'>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div>
              <h1 className="text-2xlg font-semibold text-center">Nueva categoría</h1>
            </div>
            <div className="divide-y divide-gray-200 my-10">
              <form id='form' onSubmit={ handleSubmit }>
                <div className="mb-6">
                  <input type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Nombre categoría" required />
                </div>
                <div className="mb-6 flex justify-center items-center">
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar categoría</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className='relative py-32 sm:max-w-xl sm:mx-auto content'>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div>
              <h1 className="text-2xlg font-semibold text-center">Nuevo usuario</h1>
            </div>
            <div className="divide-y divide-gray-200 my-10">
              <form id='form' onSubmit={ handleSubmit }>
                <div className="mb-6">
                  <input type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Nombre completo" required />
                </div>
                <div className="mb-6">
                  <input type="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='Correo' required />
                </div>
                <div className="mb-6 flex justify-center items-center">
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar usuario</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductForm

export async function getServerSideProps ({ req }) {
  const access = getCookie('access', req)

  if (access != 'admin') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}