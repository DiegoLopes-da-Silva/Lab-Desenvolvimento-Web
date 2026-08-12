import express from "express";
import cors from  "cors";
import routes from "./routes/routes.js";
import swaggerUi from "swagger-ui-express";
import { createRequire} from "module";
//suporte para importar arquivos json usando ESModules

const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");
const app = new express();
const port = 3000;

//comunicação entre front e back usar json
app.use(express.json);
app.use(cors({
    credentials: true,
    origin: `http://localhost:${port}`,
}));

//obrigatoriamente o swagger deve vir antes da rotas
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//ligar o express com as rotas
app.use("/ToDo", routes);
//Forma o Url completo que deve ser algo semelhante a: http://localhost:5000/ToDo/Create
//ToDo é a Url base desse projeto, definida no app.use

app.listen(5000);