import { Router } from 'express'
import {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  deleteAllExpenses
} from '../controllers/expenses.js'

export const expensesRouter = Router()

expensesRouter.get('/', getAllExpenses).post('/', createExpense).delete('/', deleteAllExpenses)
expensesRouter.get('/:id', getExpenseById).patch('/:id', updateExpense).delete('/:id', deleteExpense)
