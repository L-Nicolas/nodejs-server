import { getAll } from './products.mjs';
import products from './products.json';

test("Récupération des produits", () => expect(getAll()).toMatchObject(products))