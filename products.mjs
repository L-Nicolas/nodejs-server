import { readFileSync, writeFileSync } from 'fs';
/* import { Request, Response } from 'express'; */

let file = "products.json";
let products = JSON.parse(readFileSync(file, "utf-8"));

const writeFile = () => {
    writeFileSync(file, JSON.stringify(products));
    console.log('La liste de produit(s) à été mise à jour')
}

const add = (name, qty) => {
    let pdt = { "name": name, "quantity": qty };
    let result = getByName(name);

    if (result.error === false) {
        products.find(element => element.name == name).quantity += parseInt(qty);
        writeFile();
        return { error: false, message: `Produit : '${name}' déjà existant, ${qty} item(s) ajouté(s)`, data: result.data }
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
    let result = getByName(pdt.name);

    if (result.error === false) {
        let prod = products.find(element => element.name == pdt.name);
        if (prod) {
            prod.name = name;
            console.log(`Produit : '${pdt.name}' modifié en '${name}'`)
        }
    } else {
        console.log(result.message);
    }
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