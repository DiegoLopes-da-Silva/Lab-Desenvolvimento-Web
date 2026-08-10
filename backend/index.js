import express from "express";
import cors from  "cors";

//incluir as notas

const app = new express();
const port = 3000;

//comunicação entre front e back usar json
app.use(express.json);
app.use(cors({
    credentials: true,
    origin: `http://localhost:${port}`,
}));

//ligar o express com as rotas

app.listen(5000);