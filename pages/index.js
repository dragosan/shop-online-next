import Layout from '../components/Layout'
import ProductItem from '../components/ProductItem'
import Product from '../models/Product'
import axios from 'axios'
import connectDB, { convertDocToObj } from '../utils/db'
import { Store } from '../utils/Store'
import { toast } from 'react-toastify'
import { useContext } from 'react'

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store)

  const addToCart = async (product) => {
    const existedItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    )
    const qty = existedItem ? existedItem.qty + 1 : 1
    const { data } = await axios.get(`/api/products/${product._id}`)

    if (data.countInStock < qty) {
      return toast.error('Sorry ,Not enough items in Stock')
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, qty } })
    // toast.success('product added to cart', { autoClose: 1000, progress: 0 })
  }

  return (
    <Layout title="Home Page" suppressHydrationWarning={true}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCart={addToCart}
          />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await connectDB()
  const products = await Product.find().lean()
  return {
    props: {
      products: products.map(convertDocToObj),
    },
  }
}
