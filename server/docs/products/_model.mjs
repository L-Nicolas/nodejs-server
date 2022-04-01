export default {
  product: {
    type: 'object',
    properties: {
      name: {
        type: 'String',
        description: 'name of product',
        example: 'chips',
      },
      quantity: {
        type: 'number',
        description: 'quantity of product',
        example: '12',
      },
    },
  },
  products: {
    type: 'object',
    additionalProperties: {
      $ref: '#/components/schemas/product',
    },
  },
}
