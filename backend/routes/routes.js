import {Router} from "express";
import TarefaController from "../controllers/TarefaController.js";

const routes = new Router();

routes.post("/create", TarefaController.Create);

routes.get("/getAll", TarefaController.getAll);

export default routes;