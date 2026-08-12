import swaggerAutogen from "swagger-autogen";
const doc = {
    info: {
        title: 'API ToDo List',
        description: 'Documentação para a geração automática dos testes com Swagger'
    },
    host: 'localhost:5000',
    basePath: '/ToDo',
}

//Nome do arquivo que será gerado automaticamente
const outputFile = './swagger-output.json';

//Caminho para as rotas
const routesFile = ['./routes/routes.js'];
swaggerAutogen(outputFile, routesFile, doc);