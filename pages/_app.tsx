import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import MainHeader from '../src/MainHeader'
import DocumentMeta from 'react-document-meta';
import {ContextProvider} from '../contexts/ContextProvider';
require('@solana/wallet-adapter-react-ui/styles.css');

export default function App({ Component, pageProps }: AppProps) {
  const meta = {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  }
  return <ContextProvider>
    <DocumentMeta {...meta}>
      <MainHeader></MainHeader>
      <Component {...pageProps} />
    </DocumentMeta>
  </ContextProvider>
}
