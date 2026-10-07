import Tarefa from "../Models/Tarefa.js";
import {Types} from "mongoose";
export default class TarefaController{
    static async Create(req, res){
        const{titulo, descricao, dataLimite, participam} = req.body;
        const usuarioLogado = req.user.id;
        if(!titulo || !descricao || !dataLimite)
        {
            return res.status(422).json({message: "Todos os dados são obrigatórios"});
        }
        try {
            const tarefa = new Tarefa({
                titulo,
                descricao,
                dataLimite,
                situacao: "PENDENTE",
                criadoPor: usuarioLogado,
                participam: Array.isArray(participam)? 
                participam : (participam ? [participam] : [])

            });
            const novaTarefa = await tarefa.save();
            const tarefaPopulada = await Tarefa.findById(
                novaTarefa._id)
                .populate("criadoPor", "nome email")
                .populate("participam", "nome email");
            res.status(200).json({message:"Tarefa inserida com sucesso", novaTarefa:tarefaPopulada});
            return;
        } catch (error) {
            return res.status(500).json({message:"Problema ao inserir uma tarefa", error});
        }
    }//fim create
    static async getAll(req, res){
        const usuarioLogado = req.user.id;
        try {
            const tarefas = await Tarefa.find({
                    $or:[
                        {criadoPor:usuarioLogado},
                        {participam: usuarioLogado}
                    ]
                })
                .populate("criadoPor", "nome")
                .populate("participam", "nome")
                .sort({ createdAt: -1 });
            
            return res.status(200).json({message:"Buscar tarefas com sucesso", tarefas});
        } catch (error) {
            return res.status(500).json({message:"Erro ao buscar todas tarefas", error});
        }

    }//fim getAll


    //Método criado para tarefa de gráfico com cancelada e concluida
    static async UpdateSituacao(req, res){
        const { id } = req.params;
        const { situacao } = req.body;
        const usuarioLogado = req.user.id;
        const situacoesPermitidas = ["CANCELADA", "CONCLUIDA"];

        if(!Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "ID da tarefa inválido"});
        }

        if(!situacoesPermitidas.includes(situacao)){
            return res.status(422).json({
                message: "Situação inválida. Use CANCELADA ou CONCLUIDA"
            });
        }

        try {
            const tarefa = await Tarefa.findOne({
                _id: id,
                $or:[
                    {criadoPor: usuarioLogado},
                    {participam: usuarioLogado}
                ]
            });

            if(!tarefa){
                return res.status(404).json({message: "Tarefa não encontrada"});
            }

            if(tarefa.situacao !== "PENDENTE"){
                return res.status(400).json({
                    message: "Esta tarefa já foi finalizada ou cancelada"
                });
            }

            tarefa.situacao = situacao;
            await tarefa.save();

            return res.status(200).json({
                message: "Situação da tarefa atualizada com sucesso",
                tarefa
            });
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao atualizar a situação da tarefa",
                error
            });
        }
    }//fim UpdateSituacao
}