import { memo, useCallback } from 'react'

import { useCookies } from 'react-cookie'

import { Header } from '../../prezentations/Header'

import { useAuth } from '@/hooks/useAuth'

export const HeaderContainer = memo(function HeaderContainer() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken'])
  const { isLoggedIn } = useAuth()

  const logout = useCallback(() => {
    removeCookie('accessToken', { path: '/' })
    removeCookie('refreshToken', { path: '/' })
  }, [removeCookie])

  return <Header isLoggedIn={!!isLoggedIn} logout={logout} />
})
