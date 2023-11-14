import mysql from 'mysql2/promise'
import { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_DATABASE } from '../config.js'

const config = {
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_DATABASE
}

const connection = await mysql.createConnection(config)

export default connection
