import { validateExpense, validatePartialExpense } from '../schema/expenses.js'
import connection from '../models/index.js'

export const getAllExpenses = async (req, res) => {
  try {
    const [expenses] = await connection.query(
      'SELECT * FROM expenses'
    )
    return res.json(expenses)
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error' })
  }
}

export const getExpenseById = async (req, res) => {
  const { id } = req.params
  try {
    const [expense] = await connection.query(
      'SELECT * FROM expenses WHERE id = ?', [id]
    )
    if (!expense.length) return res.status(404).json({ msg: 'Expense not found' })

    return res.json(expense)
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error' })
  }
}

export const createExpense = async (req, res) => {
  const result = validateExpense(req.body)
  if (result.error) {
    return res.status(400).json(JSON.parse(result.error))
  }

  const { name, price, category, username } = result.data
  try {
    const [result] = await connection.query(
      `INSERT INTO expenses (name, price, category, username)
      VALUES (?, ?, ?, ?)`,
      [name, price, category, username]
    )
    if (result.affectedRows !== 1) {
      return res.status(404).json({ msg: 'Whoops, something went wrong D:' })
    }
    return res.json({ msg: 'Expense added successfully!' })
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error' })
  }
}

export const updateExpense = async (req, res) => {
  const result = validatePartialExpense(req.body)
  if (result.error) {
    return res.status(400).json(JSON.parse(result.error))
  }

  const { name, price, category, username } = result.data
  const { id } = req.params

  try {
    const [result] = await connection.query(
      `UPDATE expenses
      SET name = ?, price = ?, category = ?, username = ?
      WHERE id = ?`, [name, price, category, username, id]
    )

    if (result.affectedRows !== 1) {
      return res.status(404).json({ msg: 'Expense not found' })
    }

    return res.json({ msg: 'Expense updated successfully!' })
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error' })
  }
}

export const deleteExpense = async (req, res) => {
  const { id } = req.params

  try {
    const [result] = await connection.query(
      'DELETE FROM expenses WHERE id = ?', [id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Expense not found' })
    }
    return res.json({ msg: 'Expense deleted successfully!' })
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error' })
  }
}

export const deleteAllExpenses = async (req, res) => {
  try {
    const [result] = await connection.query(
      'DELETE FROM expenses'
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Whoops, something went wrong D:' })
    }
    return res.json({ msg: 'Expenses deleted successfully!' })
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error' })
  }
}
