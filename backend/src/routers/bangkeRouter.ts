import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { BankTransModel } from '../models/bankTransModel'

const app = express()

export const ruterbanke = express.Router()

// ruterbanke.get(
//   '/:ide',
//   asyncHandler(async (req: Request, res: Response) => {
//     const angene = await BankTransModel.findById(req.params.ide)
//     if (angene) {
//       res.json(angene)
//     } else {
//       res.status(404).json({ message: 'bank not found' })
//     }
//   })
// )
ruterbanke.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const bebas = await BankTransModel.find({})
    res.json(bebas)
  })
)

ruterbanke.post(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const beudoang = req.body
      const justHarga = await BankTransModel.create(beudoang)
      res.status(201).json(justHarga)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  })
)

export default ruterbanke
