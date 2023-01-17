import { useRouter } from 'next/router'
import { memo, useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useCookies } from 'react-cookie'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  username: z.string().min(1, { message: 'Required' }),
  password: z.string().min(1, { message: 'Required' }),
  password2: z.string(),
})

type Inputs = z.infer<typeof schema>

const defaultValues: Inputs = {
  username: '',
  password: '',
  password2: '',
}

export const AuthForm = memo(function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: defaultValues, resolver: zodResolver(schema) })
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken'])

  const changeResister = useCallback(() => {
    reset()
    setIsLogin(false)
  }, [reset])

  const changeLogin = useCallback(() => {
    reset()
    setIsLogin(true)
  }, [reset])

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/auth/jwt/create`, {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        })
        if (res.status === 400) {
          throw 'authentication failed'
        }
        if (!res.ok) {
          throw 'error!!'
        }
        const data = await res.json()
        setCookie('accessToken', data.access, { path: '/' })
        router.push('/')
      } catch (error) {
        setError('username', { type: 'custom', message: 'Login failure.' })
      }
    },
    [router, setCookie, setError]
  )

  const registerUser = useCallback(
    async (username: string, password: string) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/register/`, {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        })
        if (res.status === 400) {
          throw 'authentication failed'
        }
        if (!res.ok) {
          throw 'error!!'
        }
        login(username, password)
      } catch (error) {
        setError('username', { type: 'custom', message: 'Login failure.' })
      }
    },
    [login, setError]
  )

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!isLogin && data.password !== data.password2) {
      setError('password', { type: 'custom', message: 'Password is invalid.' })
      return
    }
    if (isLogin) {
      login(data.username, data.password)
    } else {
      registerUser(data.username, data.password)
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-md">
        <div className="grid grid-cols-2 border-b border-gray-200">
          <button
            type="button"
            className={`relative p-4 before:absolute before:bottom-0 before:right-0 before:left-0 before:h-0.5 before:origin-right before:bg-gradient-to-r before:from-cyan-500 before:to-blue-500 before:transition before:duration-300 ${
              isLogin ? 'before:scale-x-0' : 'before:delay-300'
            }`}
            onClick={changeResister}
          >
            新規登録
          </button>
          <button
            type="button"
            className={`relative p-4 before:absolute before:bottom-0 before:right-0 before:left-0 before:h-0.5 before:origin-left before:bg-gradient-to-r before:from-teal-500 before:to-green-500 before:transition before:duration-300 ${
              !isLogin ? 'before:scale-x-0' : 'before:delay-300'
            }`}
            onClick={changeLogin}
          >
            ログイン
          </button>
        </div>

        <div className="px-4 pt-12 pb-12 md:px-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(errors).length > 0 && (
              <div className="mb-4">
                <p className="text-center text-red-600">{isLogin ? 'ログイン' : '新規登録'}に失敗しました</p>
              </div>
            )}
            <div className="grid grid-cols-1 justify-items-center gap-4">
              <div className="max-w-full">
                <label htmlFor="username" className="sr-only">
                  ユーザー名
                </label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="ユーザー名"
                  className="w-80 max-w-full rounded-full bg-gray-100 px-5 py-2"
                  {...register('username')}
                />
              </div>
              <div className="max-w-full">
                <label htmlFor="password" className="sr-only">
                  パスワード
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  placeholder="パスワード"
                  className="w-80 max-w-full rounded-full bg-gray-100 px-5 py-2"
                  {...register('password')}
                />
              </div>
              {!isLogin && (
                <div className="max-w-full">
                  <label htmlFor="password2" className="sr-only">
                    パスワード（確認用）
                  </label>
                  <input
                    id="password2"
                    type="password"
                    autoComplete="new-password"
                    placeholder="パスワード（確認用）"
                    className="w-80 max-w-full rounded-full bg-gray-100 px-5 py-2"
                    {...register('password2')}
                  />
                </div>
              )}
            </div>
            <div className="mt-10 grid place-content-center">
              <button
                type="submit"
                className={`w-60 max-w-full rounded-full py-2 text-white shadow-sm  transition [@media(any-hover:hover){&:hover}]:shadow-lg ${
                  isLogin
                    ? 'bg-green-600 shadow-green-600 [@media(any-hover:hover){&:hover}]:bg-green-700 [@media(any-hover:hover){&:hover}]:shadow-green-700/40'
                    : 'bg-blue-600 shadow-blue-600 [@media(any-hover:hover){&:hover}]:bg-blue-700 [@media(any-hover:hover){&:hover}]:shadow-blue-700/40'
                }`}
              >
                {isLogin ? 'ログイン' : 'サインアップ'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
})
