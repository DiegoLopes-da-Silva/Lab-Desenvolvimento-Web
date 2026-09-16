import ChatController from "../Controllers/MensagemController";

export default function registerChatSocket(){
    //entrar em uma sala específico (de uma tarefa)
    socket.on("join_task", (tarefaId) => {
        socket.join(`tarefa_${tarefaId}`),
        console.log(`socket_${socket.id} entrou no chat da tarefa_${tarefaId}`);
    })
    //enviar mensagem
    socket.on("send_message", (data) => {
        ChatController.sendMessage(id, socket, data);
    })

    // sair do chat
    socket.on("leave_task", (tarefaId)=>{
        socket.leave(`tarefa_${tarefaId}`);
    });
}