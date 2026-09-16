//Pego do Pietro então pode ter diferenças
import Mensagem from "../Models/Mensagem.json";
export default class ChatController{
    static async getHistory(req, res){
        try{
            const {tarefaId} = req.params;

            const mensagem = await Mensagem.find({tarefa:tarefaId})
                .populate("remetente", "nome email")
                .sort({createdAt: 1});

            return res.status(200).json({
                mensagem
            })
        } catch(error){
            res.status(500).json({message:"Problema ao buscar o histórico das mensagens", error});
        }
    }

    static async sendMessage(io, socket, data){
        try{
            const {tarefaId, remetente, texto} = data;
            const novaMensagem = await Mensagem.create({
                tarefa: tarefaId,
                remetente:  remetente,
                texto
            });
            
            const mensagemPopulada = await Mensagem.findById(novaMensagem._id)
                .populate("remetente", "nome email");

            io.to(`tarefa_${tarefaId}`).emit("recieve_message", mensagemPopulada);

        }catch(error){
            socket.emit("chat_error",{message: "Erro ao processar mensagem"});
            console.error("Erro ao salvar/Enviar mensagem no socket");
        }
    }
}