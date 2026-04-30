import api from "../../services/axios"

export const generateProposal = (data) => {
  return api.post("/generate-proposal", data);
};