import {Router} from "express";
import UsuarioController from "../controllers/UsuarioController.js";
const routesUsuario = new Router();

routesUsuario.post("/createUsuario", UsuarioController.Create);
routesUsuario.post("/", UsuarioController.LoginUsuario);

export default routesUsuario;