import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='bg-white text-black min-h-screen p-8'>
      <Component {...pageProps} />
    </div>
  )
}
