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

    static async LoginUsuario(req, res){
        const { email, senha } = req.body;
    
        if (!email || !senha) {
          return res
            .status(422)
            .json({ message: "Todos os campos são obrigatórios." });
        }
    
        try{
          const usuario = await Usuario.findOne({ email }).select("+senha");
    
          if(!usuario){
            return res.status(404).json({message: "Dados inválidos"});
          }
    
          const senhaValida = await argon2.verify(usuario.senha, senha);
    
          if(!senhaValida){
            return res.status(400).json({message: "Credenciais inválidas"});
          }
    
          const tokenPayLoad = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
          };
    
          const token = jwt.sign(tokenPayLoad, process.env.JWT_SECRET, 
            {expireIn: "2h"
            });
          res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: process.env.JWT_EXPIRATION_MS || 3600000 
          });
        
          return res 
            .status(200)
            .json({ message: "Login efetuado com sucesso",  
              usuario : {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
              },
              token
            },
            )
        } catch(error){
            return res
            .status(500)
            .json({ message: "Erro ao Fazer login.", error });
        }
      }
}