import { Router } from 'express';
import { add, getAll, update, remove, getByName } from "./products.mjs";
const rootPdt = Router();

rootPdt.get('/products', (_, res) => {
    let products = getAll();

    if (products.length > 0) {
        res.status(200).send(products);
    }
    res.status(404).send(`Aucun produits`);
});

rootPdt.get('/products/:name', (req, res) => {
    let result = getByName(req.params.name);

    if (!result.error) {
        res.status(200).send(result.data);
    }
    res.status(404).send(`Aucun produit ${req.params.name}`);
});

rootPdt.post('/products/:name?quantity', (req, res) => {
    let result = getByName(req.params.name);

    if (!result.error) {
        res.status(200).send(result.data);
    }
    res.status(404).send(`Aucun produit ${req.params.name}`);
});

export default rootPdt;
