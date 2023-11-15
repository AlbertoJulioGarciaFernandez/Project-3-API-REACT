import axios from 'axios'

const api = axios.create({
    baseURL: "https://reservroom.onrender.com/api"
})

export default api