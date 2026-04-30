import api from "../../services/axios"


export const getProjects = ()=>{
    return api.get("/projects")
}
export const getProjectById = (id)=>{
    return api.get(`/projects/${id}`)
}
export const createProject = (data)=>{
    return api.post("/projects",data)
}

export const updateProject = (id,data)=>{
    return api.put(`/projects/${id}`,data)
}
export const deleteProject = (id)=>{
    return api.delete(`/projects/${id}`)
}