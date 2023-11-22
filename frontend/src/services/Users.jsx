import api from '.' //coge el index del service

export const getListUsers = async () => {
/*     console.log(localStorage) */
    const { data } = await api.get('/user', {
        headers:{
            "Authorization" : localStorage.getItem("token")
        }
       
    })
 /*    console.log(data) */
    return data // trae todos los datos de los usuarios
}