import Tarefa from '../models/Tarefa';
import { Types } from 'mongoose';

export default class TarefaController{
    static async Create(req, res){
        const{titulo, descricao, dataLimite, situacao} = req.body;
        if(!titulo || !descricao || !dataLimite || !situacao){
            return res
                .status(422).json({message: "Erro nos dados enviados"});
        }
        try{
            const tarefa = new Tarefa({
                titulo,
                descricao,
                dataLimite,
                situacao
            });

            const novaTarefa = await tarefa.save();
            res.status(200).json({message:"Tarefa inserida com sucesso", novaTarefa});
            return;
        } catch (error){
            return res.status(500).json({message:"Problema ao inserir uma tarefa", error});
        }
    } //Fim do create

    static async getAll(req, res) {
        try {
            const tarefas = await Tarefa.find();
            return res.status(200).json({message:"Buscar tarefas foi um sucesso", tarefas});
        }

        catch(error) {
            return res.status(500).json({message:"Erro ao buscar tarefas", error});
        }

    } //Fim getAll
}