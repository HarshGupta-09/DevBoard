import api from "../../services/axios"


export const getProjects = ()=>{
    return api.get("/projects")
}