import axios from 'axios'

let urlH = 'https://nodejs-esgi-server.herokuapp.com'

/**
 * Récuperation et affichage des produits de manière synchrone
 */
const getProducts = () => {
  axios({
    method: 'get',
    url: `${urlH}/products`,
  }).then((response) => {
    console.log(response.data)
  })
}

/**
 * Ajout d'un produit dans la liste
 *
 * @param {String} name
 * @param {Int} qty
 */
const addProduct = (name, qty) => {
  axios({
    method: 'post',
    url: `${urlH}/products`,
    data: {
      name: name,
      quantity: qty,
    },
  })
    .then((response) => {
      console.log(response.data.message)
    })
    .catch((error) => {
      console.log(error.response.data.message)
    })
}

/**
 * Récuperation et affichage des produits de manière asynchrone
 *
 * @returns {Promise}
 */
const getProductsAsync = async () => {
  return new Promise((resolve, reject) => {
    const response = axios.get(`${urlH}/products`)
    if (response.error) {
      return reject(response.error.message)
    } else {
      return resolve(response)
    }
  })
}

;(async () => {
  getProducts()
  addProduct('fromage', 4)
  const x = await getProductsAsync()
  console.log(x.data)
})()
