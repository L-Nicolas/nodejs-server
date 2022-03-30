import { Router } from 'express';
import { add, getAll, update, remove, getByName } from "./products.mjs";
const rootPdt = Router();

rootPdt.get('/products', (req, res) => {
    let products = getAll();

    if (products.length > 0) {
        res.status(200).send(products);
    } else {
        res.status(404).send(`Aucun produits`);
    }
});

rootPdt.get('/products/:name', (req, res) => {
    let result = getByName(req.params.name);

    if (!result.error) {
        res.status(200).send(result.data);
    } else {
        res.status(404).send(`Aucun produit ${req.params.name}`);
    }
});

rootPdt.post('/products/add', (req, res) => {
    const { name, quantity } = req.body;
    res.status(200).send(add(name, quantity));
    console.log(req.body);

    /* if (Object.keys(req.body).length === 0) {
        return res.status(500).send({});
    } else {
        //vérification des champs
        let dataBody = ['name', 'quantity'];
        let listError = [];

        //vérification que le body est correctement rempli
        dataBody.forEach((val) => {
            if (!Object.keys(req.body).includes(val)) {
                listError.push(`Champ ${val} manquant`);
            }
        })
        Object.entries(req.body).forEach(([key, value]) => {
            if (!value || value === "") {
                listError.push(`Champ ${key} vide`);
            }
        });

        if (listError.length > 0) {
            res.status(400).send({ error: true, message: "Erreur", data: [listError] });
        }

        let result = add(req.body.name, req.body.quantity);
        res.status(200).send(result.message);
    } */
});

rootPdt.delete('/products/:name&:quantity', (req, res) => {
    const { name, quantity } = req.params;
    let result = remove(name, quantity);

    res.status(result.code).send(result);
});

export default rootPdt;
