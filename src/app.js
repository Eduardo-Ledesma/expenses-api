import express from 'express'
import cors from 'cors'
import { apiRouter } from './routes/index.js'

const app = express()
app.use(express.json())

const ACCEPTED_ORIGINS = [
  process.env.FRONT_URL,
  'http://localhost:5173'
]
app.use(cors({
  origin: ACCEPTED_ORIGINS
}))

app.use('/api', apiRouter)
app.use((req, res) => {
  res.status(404).send('Not found 404')
})

export default app
