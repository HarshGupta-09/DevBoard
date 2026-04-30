import api from "../../services/axios"


export const getProjects = ()=>{
    return api.get("/projects")
}

export const updateProject = (id,data)=>{
    return api.put(`/projects/${id}`,data)
}