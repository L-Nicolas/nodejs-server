import jwt from 'jsonwebtoken'
import fs from 'fs'

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
