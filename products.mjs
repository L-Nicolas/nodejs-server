import { readFileSync, writeFileSync } from 'fs';
import https from 'https';
/* import { Request, Response } from 'express'; */

let file = "products.json";
let products = JSON.parse(readFileSync(file, "utf-8"));
let productsAuth = ["Chips", "Eau", "Pate"];

const writeFile = () => {
    writeFileSync(file, JSON.stringify(products));
    console.log('La liste de produit(s) à été mise à jour')
}

const add = (name, qty) => {
    let pdt = { "name": name, "quantity": qty };
    let result = getByName(name);

    if (result.error === false) {
        if (products.length > 10) {
            return { error: true, message: `La liste ne peut pas avoir + de 10 produits !!`, data: result.data }
        }
        /* if (name === "Chips") {
            let prod = products.find(element => element.name == name);
            if ((prod.quantity + parseInt(qty)) > 100) {
                return { error: true, message: `Produit : '${name}' déjà existant, ${qty}/100 éléments, quantité max !!`, data: result.data }
            } else {
                prod.quantity += parseInt(qty);
                writeFile();
                return { error: false, message: `Produit : '${name}' déjà existant, ${qty} item(s) ajouté(s). Quantité : ${qty}/100`, data: result.data }
            }
        } else {
            return { error: true, message: `Sarah c'est pas bien`, data: ["https://product-esgi.herokuapp.com/products"] }
        } */
        const options = {
            hostname: 'https://product-esgi.herokuapp.com',
            path: '/products',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
        })

        req.on('error', error => {
            console.error(error)
        })
        req.write(JSON.stringify({
            name: name,
            quantity: 666
        }))
        req.end()
        return { error: true, message: `Sarah c'est pas bien`, data: ["https://product-esgi.herokuapp.com/products"] }
    } else {
        products.push(pdt);
        writeFile();
        return { error: false, message: `Produit : '${name}' ajouté`, data: [] }
    }
}

const getAll = () => {
    return products;
}

const getByName = (name) => {
    let result = { error: true, message: `Produit : '${name}' inexistant`, data: [] };
    products.forEach((elem) => {
        if (elem.name == name) {
            result.error = false;
            result.message = `Produit : '${name}' existant`;
            result.data = elem;
        }
    });
    return result;
}

const update = (name, pdt) => {
    /* let result = getByName(pdt.name);

    if (result.error === false) {
        let prod = products.find(element => element.name == pdt.name);
        if (prod) {
            prod.name = name;
            console.log(`Produit : '${pdt.name}' modifié en '${name}'`)
        }
    } else {
        console.log(result.message);
    } */
    return { error: true, message: `Sarah c'est pas bien`, data: ["https://product-esgi.herokuapp.com/products"] }
}

const remove = (name, qty) => {
    let result = getByName(name);

    if (result.error === false) {
        if (result.data.quantity <= qty) {
            products = products.filter((e) => e.name != name);
            writeFile();
            return { code: 200, error: false, message: `Produit : '${name}' supprimé`, data: [] }
        } else {
            result.data.quantity -= qty;
            writeFile();
            return { code: 200, error: false, message: `Produit : '${name}' modifié, ${qty} élément(s) retiré(s). Quantité restante : ${result.data.quantity}`, data: [] }
        }
    } else {
        console.log(result.message);
        result.code = 404;
        return result;
    }
}

export { add, getAll, update, remove, getByName };