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

const addProduct = () => {
    axios({
        method: 'post',
        url: `${urlH}/products`,
        data: {
            name: 'test',
            quantity: 2
        }
    }).then((response) => {
        console.log(response.data);
    });
}

const getProductsAsync = async () => {
    axios({
        method: 'get',
        url: `${urlH}/products`
    }).then((response) => {
        console.log(response.data);
    });
}

const iife = async () => {
    getProducts();
    addProduct();
    await getProductsAsync();
}


await iife();