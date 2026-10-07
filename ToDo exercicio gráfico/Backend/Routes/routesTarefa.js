import {Router} from "express";
import TarefaController from "../Controllers/TarefaController.js";
import UserMiddleware from "../Middleware/UserMiddleware.js";
const routesTarefa = new Router();

routesTarefa.post("/create", UserMiddleware, TarefaController.Create);
routesTarefa.get("/getAll", UserMiddleware, TarefaController.getAll);
//Rotas utilizadas para novo gráfico de situação
routesTarefa.patch("/situacao/:id", UserMiddleware, TarefaController.UpdateSituacao);

export default routesTarefa;