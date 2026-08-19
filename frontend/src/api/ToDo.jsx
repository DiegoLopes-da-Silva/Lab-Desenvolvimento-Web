import axios from 'axios';
const api = axios.create({    
    baseURL: 'http:localhost:5000/ToDo', 
    headers: {
        "Content-Type": "application.json"
    }
})

export const getToDos=()=>api.get("/getAll");
export const createToDo=()=>api.post("/create");
export default api;