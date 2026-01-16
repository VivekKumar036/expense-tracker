import axios from "axios";

const api = axios.create({
  baseURL: "https://expense-tracker-backend-hhq7.onrender.com/api"
});

export default api;
