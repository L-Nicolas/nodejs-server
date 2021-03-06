import { readFileSync, writeFileSync } from 'fs'
/* import { Request, Response } from 'express'; */

let file = 'products.json'
let products = JSON.parse(readFileSync(file, 'utf-8'))
let productsAuth = ['chips', 'eau', 'pate', 'fromage', 'jus', 'riz']

const writeFile = () => {
  writeFileSync(file, JSON.stringify(products))
  console.log('La liste de produit(s) à été mise à jour')
}

const add = (name, qty) => {
  name = name.toLowerCase()
  name = name.replace(/\W/gm, '-')

  let pdt = { name: name, quantity: qty }
  let retour = {
    error: true,
    message: `Problème lors de l'insertion`,
    data: [],
  }

  if (products.length > 10) {
    retour.message = `La liste ne peut pas avoir + de 10 produits !!`
  } else if (!productsAuth.includes(name)) {
    retour.message = `Attention mon médecin ne m'a pas autorisé à acheter ce produit`
  } else if (parseInt(qty) > 100) {
    retour.message = `Erreur quantity : impossible d'ajouter autant de produits, 100 produits maximum`
  } else {
    /* Vérification que le produit est déjà présent dans la liste */
    let prod = getByName(name)
    if (prod.error) {
      products.push(pdt)
      retour.error = false
      retour.message = `Produit : '${name}' ajouté`
      retour.data = pdt
      writeFile()
    } else {
      if (prod.data.quantity + parseInt(qty) > 100) {
        retour.message = `Erreur quantity : impossible d'ajouter ${qty} élément(s), la quantité que vous souhaitez ajouter est trop grande, ${prod.data.quantity}/100`
      } else {
        if (prod.data.quantity + parseInt(qty) > 100) {
          retour.message = `Produit : '${name}' déjà existant, impossible d'ajouter les produits : ${prod.data.quantity}/100 éléments`
          retour.data = prod
        } else {
          prod.data.quantity += parseInt(qty)
          retour.error = false
          retour.message = `Produit : '${name}' déjà existant, ${qty} item(s) ajouté(s). Quantité : ${prod.data.quantity}/100`
          retour.data = prod.data
        }
        writeFile()
      }
    }
  }
  return retour
}

const getAll = () => {
  return products
}

/**
 * Récupération d'un produit selon son nom
 *
 * @param {String} name
 *
 * @returns {JSON}
 */
const getByName = (name) => {
  let result = {
    error: true,
    message: `Produit : '${name}' inexistant`,
    data: [],
  }
  let prod = products.find((element) => element.name === name)
  if (prod) {
    result.error = false
    result.message = `Produit : '${name}' existant`
    result.data = prod
  }
  return result
}

/**
 * Mise à jour du nom ou d'une quantité d'un produit
 *
 * @param {String} name
 * @param {Object} pdt
 *
 * @returns {JSON}
 */
const update = (name, pdt) => {
  let result = {
    error: true,
    message: `Produit : '${name}' inexistant`,
    data: [],
  }
  let prod = products.find((element) => element.name === pdt.name)
  if (prod) {
    prod.name = name
    result.error = false
    result.message = `Produit : '${pdt.name}' modifié en '${name}'`
    result.data = prod
  }
  return result
}

const remove = (name, qty) => {
  let result = getByName(name)

  if (result.error === false) {
    if (result.data.quantity <= qty) {
      products = products.filter((e) => e.name !== name)
      writeFile()
      return {
        code: 200,
        error: false,
        message: `Produit : '${name}' supprimé`,
        data: [],
      }
    } else {
      result.data.quantity -= qty
      writeFile()
      return {
        code: 200,
        error: false,
        message: `Produit : '${name}' modifié, ${qty} élément(s) retiré(s). Quantité restante : ${result.data.quantity}`,
        data: [],
      }
    }
  } else {
    console.log(result.message)
    result.code = 404
    return result
  }
}

export { add, getAll, update, remove, getByName }
