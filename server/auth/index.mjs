import jwt from 'jsonwebtoken'
import fs from 'fs'

/* const WHITE_ROUTES = ['/auth']

const authToken = (req, res, next) => {
  if (WHITE_ROUTES.some((r) => r === req.url)) {
    next()
    return
  }
} */
//@token = 'letoken retourné'
//Authorization Bearer {{token}}

/* const authHeader = req.headers('authorization')
if (!authHeader) res.sendStatus(401) */

/* const token = authHeader.split('')[1]
if () */

/**
 *
 * @param {Object} data
 *
 * @returns
 */
const generateAccessToken = (data) => {
  if (!data) return null

  delete data.password
  return jwt.sign(data, process.env.TOKEN, { expiresIn: '1800s' })
}

/**
 *
 * @param {String} name
 * @param {String} password
 *
 * @returns
 */
const auth = (name, password) => {
  const file = fs.readFileSync('./auth/users.json', 'utf-8')
  const users = JSON.parse(file)
  const user = users.find((e) => e.name === name && e.password === password)

  return generateAccessToken(user)
}

export { auth }
