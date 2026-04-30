import api from "../../services/axios"

export const getMilestonesByProject = (id)=>{
    return api.get(`/milestones/${id}`)
}
export const updateMilestone = (id,data)=>{
    return api.put(`/milestones/${id}`,data)
}
export const deleteMilestone = (id)=>{
    return api.delete(`/milestones/${id}`)
}
export const createMilestone = (data)=>{
    return api.post("/milestones",data)
}