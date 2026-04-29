import api from "../../services/axios"


export const getClients = ()=>{
    return api.get("/clients")
}
export const editClient = (id)=>{
    return api.put(`/clients/${id}`)
}
export const deleteClient = (id)=>{
    return api.delete(`/clients/${id}`)
}

export const createClient = (data)=>{
    return api.post("/clients",data)
}