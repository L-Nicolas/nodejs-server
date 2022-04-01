import { Router } from 'express'
import { add, getAll, remove, getByName } from './products.mjs'
import { auth } from './auth/index.mjs'

const rootPdt = Router()

/**
 * Récupération de l'ensemble des produits
 *
 * @returns {JSON}
 */
rootPdt.get('/products', (req, res) => {
  let products = getAll()

  if (products.length > 0) {
    res.status(200).send(products)
  } else {
    res.status(404).send(`Aucun produits`)
  }
})

/**
 * Récupération d'un produit selon son nom
 * @param {String} n : name
 *
 * @returns {JSON}
 */
rootPdt.get('/products/:name', (req, res) => {
  let result = getByName(req.params.name)

  if (!result.error) {
    res.status(200).send(result.data)
  } else {
    res.status(404).send(`Aucun produit ${req.params.name}`)
  }
})

/**
 * Ajout d'un produit
 * @param {String} n : name
 * @param {Int} q : quantity
 *
 * @returns {JSON}
 */
rootPdt.post('/products', (req, res) => {
  /* const { name, quantity } = req.body;
    let result = add(name, quantity);

    if (!result.error) {
        res.status(200).send(result);
    } else {
        res.status(404).send(result);
    } */

  if (Object.keys(req.body).length === 0) {
    res.status(500).send()
  } else {
    //vérification des champs
    let dataBody = ['name', 'quantity']
    let listError = []

    //vérification que le body est correctement rempli
    dataBody.forEach((val) => {
      if (!Object.keys(req.body).includes(val)) {
        listError.push(`Champ ${val} manquant`)
      }
    })
    Object.entries(req.body).forEach(([key, value]) => {
      if (!value || value === '') {
        listError.push(`Champ ${key} vide`)
      }
    })

    if (listError.length > 0) {
      res
        .status(400)
        .json({ error: true, message: 'Erreur', data: [listError] })
    } else {
      let { name, quantity } = req.body
      let result = add(name, quantity)

      if (!result.error) {
        res.status(200).send(result)
      } else {
        res.status(404).send(result)
      }
    }
  }
})

/**
 * Suppression d'une quantité de produit
 * @param {String} n : name
 * @param {Int} [q : quantity]
 *
 * @returns {JSON}
 *
 * @depracated
 */
rootPdt.delete('/products/:name', (req, res) => {
  const { name } = req.params
  const quantity = req.query.quantity ?? 1

  let result = remove(name, quantity)

  res.status(result.code).send(result)
})

rootPdt.post('/auth', (req, res) => {
  const { name, password } = req.body
  let result = auth(name, password)

  if (!result) {
    res.status(400).send(result)
  } else {
    res.status(200).send(result)
  }
})

export default rootPdt
