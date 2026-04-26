import api from "axios"


export const getClients = ()=>{
    return api.get("/clients")
}