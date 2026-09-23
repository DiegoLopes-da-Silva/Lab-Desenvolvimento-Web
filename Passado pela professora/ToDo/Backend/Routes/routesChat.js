import {Router} from "express";
import ChatController from "../Controllers/TarefaController.js";
import UserMiddleware from "../Middleware/UserMiddleware.js";

const routesChat = new Router();

routesChat.get("/getHistory/:tarefaId", UserMiddleware, TarefaController.getAll);

export default routesChat;