import React, { createContext, useReducer } from 'react'
import Cookies from 'js-cookie'

import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_RESET,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
} from './types'

export const Store = createContext()

const initialState = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : { cartItems: [], shippingAddress: {}, paymentMethod: '' },
}

function reducer(state, { type, payload }) {
  switch (type) {
    case CART_ADD_ITEM: {
      const existedItem = state.cart.cartItems.find(
        (item) => item.slug === payload.slug
      )
      const cartItems = existedItem
        ? state.cart.cartItems.map((item) =>
            item.name === existedItem.name ? payload : item
          )
        : [...state.cart.cartItems, payload]
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))
      return {
        ...state,
        cart: { ...state.cart, cartItems },
      }
    }
    case CART_REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== payload.slug
      )
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case CART_CLEAR_ITEMS: {
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems: [] }))
      return { ...state, cart: { ...state.cart, cartItems: [] } }
    }
    case CART_RESET: {
      Cookies.remove('cart')
      return { ...state, cart: { ...state.cart, cartItems: [] } }
    }
    case SAVE_SHIPPING_ADDRESS: {
      Cookies.set(
        'cart',
        JSON.stringify({ ...state.cart, shippingAddress: { ...payload } })
      )
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: { ...payload } },
      }
    }
    case SAVE_PAYMENT_METHOD: {
      Cookies.set(
        'cart',
        JSON.stringify({ ...state.cart, paymentMethod: payload })
      )
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: payload },
      }
    }

    default:
      return state
  }
}
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}

export default StoreProvider
