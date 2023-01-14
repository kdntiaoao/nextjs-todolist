import { memo, useCallback } from 'react'

import { useCookies } from 'react-cookie'

import { Header } from '../../prezentations/Header'

export const HeaderContainer = memo(function HeaderContainer() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken'])

  const logout = useCallback(() => {
    removeCookie('accessToken', { path: '/' })
  }, [removeCookie])

  return <Header isLoggedIn={!!cookies.accessToken} logout={logout} />
})
