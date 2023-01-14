import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { CookiesProvider } from 'react-cookie'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}

export default App
