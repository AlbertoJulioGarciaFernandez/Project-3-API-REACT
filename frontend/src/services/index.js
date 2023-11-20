import axios from 'axios'

const api = axios.create({
    baseURL: "https://reservroom.onrender.com"
})

export default api