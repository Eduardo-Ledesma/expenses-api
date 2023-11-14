import { Router } from 'express'
import { expensesRouter } from './expenses.js'

export const apiRouter = Router()

apiRouter.use('/expenses', expensesRouter)
apiRouter.use('/', (req, res) => { res.json({ msg: 'Home' }) })
