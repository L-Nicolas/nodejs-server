import { Add, Substract, Multiply } from './calc.js';

describe("test des fonctions du fichier calc.js", () => {
    test("Addition de 5 + 2", () => expect(Add(5, 2)).toEqual(7))
    test("Soustraction de 5 - 2", () => expect(Substract(5, 2)).toEqual(3))
    test("Multiplication de 5 * 2", () => expect(Multiply(5, 2)).toEqual(10))
});