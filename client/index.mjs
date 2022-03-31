import axios from 'axios';

let urlH = 'https://nodejs-esgi-server.herokuapp.com';

const getProducts = () => {
    axios({
        method: 'get',
        url: `${urlH}/products`
    }).then((response) => {
        console.log(response.data);
    });
}

const addProduct = (name, qty) => {
    axios({
        method: 'post',
        url: `${urlH}/products`,
        data: {
            name: name,
            quantity: qty
        }
    }).then((response) => {
        console.log(response.data.message);
    }).catch((error) => {
        console.log(error.response.data.message);
    });
}

const getProductsAsync = async () => {
    return new Promise((resolve, reject) => {
        const response = axios.get(`${urlH}/products`);
        if (response.error) {
            return reject(response.error.message);
        } else {
            return resolve(response)
        }
    });
}

(async () => {
    getProducts();
    addProduct("fromage", 4);
    const x = await getProductsAsync();
    console.log(x.data);
})();