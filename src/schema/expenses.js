import { z } from 'zod'

const expenseSchema = z.object({
  name: z.string({
    invalid_type_error: 'Expense name must be a text.',
    required_error: 'Expense name is required.'
  }),
  price: z.number({
    invalid_type_error: 'Price must be a positive number.',
    required_error: 'Price is required.'
  }).int().min(1),
  category: z.enum(['gastosFijos', 'compras', 'gato', 'permitidos'], {
    required_error: 'Category is required.'
  }),
  username: z.string()
})

export function validateExpense (schema) {
  return expenseSchema.safeParse(schema)
}

export function validatePartialExpense (schema) {
  return expenseSchema.partial().safeParse(schema)
}
