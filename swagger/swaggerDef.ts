import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CommerceTools SDK',
            version: '1.0.0',
            description: 'CommerceTools SDK example documentation',
        },
    },
    apis: ['./**/swagger/components.ts','./**/routes/*.ts'], // Path to the API docs
};

const swaggerSpecification = swaggerJsdoc(options);

export default swaggerSpecification;