import api from '../../services/axios.js'


export const loginUser = (data)=>{

  return   api.post("/auth/users/signin",data)
}

export const signupUser = (data)=>{
   return  api.post("/auth/users/signup",data)
}


export const getMe = ()=>{
  return api.get("/auth/users/me")
}