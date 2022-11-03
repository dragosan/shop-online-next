/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import Link from 'next/link'
import { Store } from '../utils/Store'

const ProductItem = ({ product, addToCart }) => {
  // const { state, dispatch } = useContext(Store)

  // const addToCart = () => {
  //   const existedItem = state.cart.cartItems.find(
  //     (item) => item.slug === product.slug
  //   )
  //   const qty = existedItem ? existedItem.qty + 1 : 1

  //   if (product.countInStock < qty) {
  //     alert('Sorry. Product is out of stock')
  //     return
  //   }

  //   dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, qty } })
  // }
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default ProductItem
