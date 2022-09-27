import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{'Shop Online - ' + title}</title>
        <meta name="description" content="E-commerce app using next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen justify-between">
        <header>
          <nav className="flex justify-between items-center h-12 px-4 shadow-md">
            <Link href="/">
              <a className="text-lg font-bold">Shop Online</a>
            </Link>
            <div>
              <Link href="/">
                <a className="p-2">Cart</a>
              </Link>
              <Link href="/">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          Footer
        </footer>
      </div>
    </>
  )
}

export default Layout
