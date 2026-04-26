import api from "../../services/axios"


export const getClients = ()=>{
    return api.get("/clients")
}