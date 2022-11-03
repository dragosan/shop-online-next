import data from '../../utils/data'
import User from '../../models/User'
// import db from '../../utils/db'
import connectDB from '../../utils/db'
import Product from '../../models/Product'

const importData = async (req, res) => {
  await connectDB()
  await User.deleteMany()
  await Product.deleteMany()
  await User.insertMany(data.users)
  await Product.insertMany(data.products)

  res.send({ message: 'Data imported successfully' })
}

export default importData
