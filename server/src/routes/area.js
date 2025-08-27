import express from 'express'
import * as controller from '../controller/area'
//CRUD
const router = express.Router()

router.get('/all', controller.getAreas)

export default router