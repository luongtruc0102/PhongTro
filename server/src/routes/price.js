import express from 'express'
import * as controller from '../controller/price'
//CRUD
const router = express.Router()

router.get('/all', controller.getPrices)

export default router