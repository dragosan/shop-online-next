import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import Link from 'next/link'

import Product from '../../models/Product'
import Layout from '../../components/Layout'
// import data from '../../utils/data'
import { Store } from '../../utils/Store'
import { convertDocToObj } from '../../utils/db'
import { toast } from 'react-toastify'

const ProductScreen = ({ product }) => {
  // const { query } = useRouter()
  // const { slug } = query

  const { state, dispatch } = useContext(Store)

  // const product = data.products.find((item) => item.slug === slug)

  const addToCart = () => {
    const existedItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    )
    const qty = existedItem ? existedItem.qty + 1 : 1

    if (product.countInStock < qty) {
      return toast.error('Sorry. Product is out of stock')
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, qty } })
  }

  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>
  }

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Back To Products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
            </div>
            <button
              onClick={addToCart}
              className="primary-button w-full"
              disabled={product.countInStock === 0}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const { slug } = params
  const product = await Product.findOne({ slug }).lean()
  return {
    props: {
      product: product ? convertDocToObj(product) : null,
    },
  }
}

export default ProductScreen
