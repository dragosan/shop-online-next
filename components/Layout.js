import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Menu } from '@headlessui/react'

import { Store } from '../utils/Store'
import DropdownLink from './DropdownLink'
import Cookies from 'js-cookie'

const Layout = ({ children, title }) => {
  const { status, data: session } = useSession()
  const { state, dispatch } = useContext(Store)
  const [cartItemsCount, setcartItemsCount] = useState(0)

  useEffect(() => {
    setcartItemsCount(state.cart.cartItems.reduce((a, c) => a + c.qty, 0))
  }, [state.cart.cartItems])

  const logout = () => {
    dispatch({ type: 'CART_RESET' })
    signOut({ callbackUrl: '/login' })
  }
  return (
    <>
      <Head>
        <title>{'Ecomm - ' + title}</title>
        <meta name="description" content="E-commerce app using next.js" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <a className="text-lg font-bold">amazona</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-2">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
              </Link>
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-48 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <a className="dropdown-link" href="#" onClick={logout}>
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <a className="p-2">Login</a>
                </Link>
              )}
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
