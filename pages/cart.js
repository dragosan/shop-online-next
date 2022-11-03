import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios'

import Layout from '../components/Layout'
import { Store } from '../utils/Store'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../utils/types'
import { toast } from 'react-toastify'

function Cart() {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const removeItem = (item) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: item })
  }

  const updateCart = async (item, quantity) => {
    let qty = Number(quantity)
    const { data } = await axios.get(`/api/products/${product._id}`)

    if (data.countInStock < qty) {
      return toast.error('Sorry ,Not enough items in Stock')
    }
    dispatch({ type: CART_ADD_ITEM, payload: { ...item, qty } })
  }
  return (
    <Layout title="Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b"></thead>
              <tr>
                <th className="px-5 text-left">Item</th>
                <th className="px-5 text-right">Quantity</th>
                <th className="px-5 text-right">Price</th>
                <th className="px-5">Action</th>
              </tr>
              <tbody>
                {cartItems.length > 0 &&
                  cartItems.map((item) => (
                    <tr key={item.slug} className="border-b">
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                            &nbsp; {item.name}
                          </a>
                        </Link>
                      </td>
                      <td className="p-5 text-right">
                        <select
                          value={item.qty}
                          onChange={(e) => updateCart(item, e.target.value)}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-center">
                        <button onClick={() => removeItem(item)}>
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  SubTotal : ({cartItems.reduce((a, c) => a + c.qty, 0)}){' '}
                  {cartItems.reduce((a, c) => a + c.qty * c.price, 0)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('login?redirect=/shipping')}
                  className="primary-button w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false })
