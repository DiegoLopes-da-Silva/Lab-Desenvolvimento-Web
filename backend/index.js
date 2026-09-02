import "dotenv/config";
import express from "express";
import cors from  "cors";
import routesTarefa from "./routes/routesTarefa.js";
import routesUsuario from "./routes/routesUsuario.js";
import swaggerUi from "swagger-ui-express";
import { createRequire} from "module";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000;
const FRONT_END_URL = process.env.FRONTEND_URL || PORT;

const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");
const app = new express();

//comunicação entre front e back usar json
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: FRONT_END_URL,
}));

//obrigatoriamente o swagger deve vir antes da rotas
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//ligar o express com as rotas
app.use("/ToDo", routesTarefa);
app.use("/ToDo", routesUsuario);
//Forma o Url completo que deve ser algo semelhante a: http://localhost:5000/ToDo/Create
//ToDo é a Url base desse projeto, definida no app.use

app.listen(PORT, () => {
    console.log(`Rodando`)
})