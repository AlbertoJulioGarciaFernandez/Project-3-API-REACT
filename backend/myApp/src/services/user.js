import api from "."

export async function getAllUsers(){
    const response = await api.get('/booking', {
        headers:{
            authorization: localStorage.getItem('token')
        }
    })
    console.log(response)
}

//getItem o localStore.token