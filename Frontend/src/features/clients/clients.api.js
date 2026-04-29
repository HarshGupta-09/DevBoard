import api from "../../services/axios"


export const getClients = ()=>{
    return api.get("/clients")
}

export const createClient = (data)=>{
    return api.post("/clients",data)
}