import Head from 'next/head'
import React from 'react'

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{'Shop Online - ' + title}</title>
        <meta name="description" content="E-commerce app using next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  )
}

export default Layout
