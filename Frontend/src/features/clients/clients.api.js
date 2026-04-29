import api from "../../services/axios"


export const getClients = ()=>{
    return api.get("/clients")
}
export const editClient = (id,data)=>{
    return api.put(`/clients/${id}`,data)
}
export const deleteClient = (id)=>{
    return api.delete(`/clients/${id}`)
}

export const createClient = (data)=>{
    return api.post("/clients",data)
}