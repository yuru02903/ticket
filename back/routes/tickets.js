import { Router } from 'express'
import { create, getMyTickets, getLaunchedTickets } from '../controllers/tickets.js'
import * as auth from '../middlewares/auth.js'
import upload from '../middlewares/upload.js'
// import admin from '../middlewares/admin.js'

const router = Router()
router.post('/', auth.jwt, upload, create)
router.get('/all', auth.jwt, getLaunchedTickets)
router.get('/my', auth.jwt, getMyTickets)

export default router
