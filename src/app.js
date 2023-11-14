import express from 'express'
import cors from 'cors'
import { apiRouter } from './routes/index.js'

const app = express()
app.use(express.json())
app.use(cors())
app.disable('x-powered-by')

app.use('/api', apiRouter)
app.use((req, res) => {
  res.status(404).send('Not found 404')
})

export default app
