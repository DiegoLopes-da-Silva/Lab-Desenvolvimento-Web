import Usuario from '../models/Usuario.js';
//import argon2 from "argon2";
import { Types } from 'mongoose';

export default class UsuarioController{
    static async Create(req, res){
        const{nome, email, senha} = req.body;
        if(!nome || !email || !senha){
            return res
                .status(422).json({message: "Erro nos dados enviados"});
        }
        try{
            //Comentado por conta do argon2
            //const hashPassword = await argon2.hash(senha);
            const usuario = new Usuario({
                nome,
                email,
                senha,
                //senha:hashPassword,
            });

            const novoUsuario = await usuario.save();
            res.status(200).json({message:"Usuario inserido com sucesso", novoUsuario});
            return;
        } 
        
        catch (error) {
            console.error("ERRO COMPLETO:", error);
        
            return res.status(500).json({
                message: "Problema ao inserir um usuario",
                error: {
                    message: error.message,
                    code: error.code,
                    errno: error.errno,
                    sqlState: error.sqlState,
                    sqlMessage: error.sqlMessage
                }
            });
        }
        /*catch (error){
            return res.status(500).json({message:"Problema ao inserir uma tarefa", error});
        }*/
    } //Fim do create
}