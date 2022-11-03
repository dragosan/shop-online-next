import { getSession } from 'next-auth/react'
import Order from '../../../models/Order'

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).send('Login Required')
  }

  const { user } = session
  const newOrder = new Order({
    ...req.body,
    user: user._id,
  })

  const order = await newOrder.save()
  console.log(order)
  res.status(201).send(order)
}

export default handler
