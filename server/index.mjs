import routes from './routes.mjs'
import express from 'express'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import docs from './docs/index.mjs'

const app = express()
const HOST = process.env.HOST || 'http://localhost'
const PORT = parseInt(process.env.PORT || '3000')

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(docs))
app.use(express.json({ extended: false }))
app.use(morgan('dev'))
app.use(routes)

app.listen(PORT, async () => {
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`)
})
console.log(process.env)
