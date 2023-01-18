import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useCookies } from 'react-cookie'

export const useAuth = () => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>()
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken'])

  useEffect(() => {
    const checkToken = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/auth/jwt/verify`, {
        method: 'POST',
        body: JSON.stringify({ token: cookies.accessToken }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (res.ok) {
        setIsLoggedIn(true)
        return
      }

      const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/auth/jwt/refresh`, {
        method: 'POST',
        body: JSON.stringify({ refresh: cookies.refreshToken }),
        headers: { 'Content-Type': 'application/json' },
      })
      const json = await refreshRes.json()
      const newRes = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/auth/jwt/verify`, {
        method: 'POST',
        body: JSON.stringify({ token: json.access }),
        headers: { 'Content-Type': 'application/json' },
      })
      if (newRes.ok) {
        setIsLoggedIn(true)
        setCookie('accessToken', json.access, { path: '/' })
        return
      }
      setIsLoggedIn(false)
      router.push('/auth')
    }
    checkToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { isLoggedIn }
}
