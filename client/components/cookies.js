import Cookies from 'js-cookie'

const setCookie = (key, value) => { Cookies.set(key, value, { expires: 1 }) }

const getCookie = (key, req) => {
  if (!req.headers.cookie) return undefined

  const cookies = req.headers.cookie.split(';').map((cookie) => cookie.trim())
  const cookie = cookies.find((cookie) => cookie.startsWith(`${key}=`))

  if (!cookie) return undefined

  return cookie.split('=')[1]
}

const removeCookie = (key) => { Cookies.remove(key) }

export { setCookie, getCookie, removeCookie }