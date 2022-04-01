export default {
    get: {
        tags: ["Products"],
        description: "Get All Products",
        operationId: "getAllProducts",
        parameters: [],
        responses: {
            200: {
                description: "Get all products",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/products",
                        },
                    },
                },
            },
        },
    },
};