import api from "./index";

export async function login(loginData){
    const {data} = await api.post('/auth/login', loginData)
    return data
    //Teniamos const response, pero por destructuring cambiamos al campo data que es lo que nos interesa
}



