import { NextApiRequest, NextApiResponse } from 'next'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log('HERE')
      return res.status(200).json('order')
    } catch (e) {
      return res.status(500)
    }
  }
}

export default handler