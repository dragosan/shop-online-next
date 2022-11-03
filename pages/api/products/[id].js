import Product from '../../../models/Product'

const getProduct = async (req, res) => {
  const product = await Product.findById(req.query.id)
  res.send(product)
}

export default getProduct
