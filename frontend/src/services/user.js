import api from ".";

export async function getMyProfile() {
  const { data } = await api.get("/user/getProfile", {
    headers: {
      authorization: localStorage.token,
    },
  });
  return data;
}
export const getListUsers = async () => {

  const { data } = await api.get("/user", {
    headers: {
      "Authorization": localStorage.getItem("token"),
    },
  });
  return data; // trae todos los datos de los usuarios
};

export async function createUser(user) {
  const response = await api.post("/auth/signup", user, {
    headers: {
      "Authorization": localStorage.getItem("token"),
    },
  });
  return response;
}

export async function updateUser(user) {
 
  const response  = await api.put(`/user/${user.id}`,{//ruta del backend dinamica y pasamos el resto de datos como objeto json
    
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      email: user.email,
      password: user.password,
      role: user.role,
    
  },
  {
    headers: {
      Authorization: localStorage.getItem("token"), 
    },
  });
  return response
}

export async function deleteUser(id) {
  const response = await api.delete(`/user/${id}`, 
  {
    headers: {
      "Authorization": localStorage.token,//tambien se puede llamar asi
    },
  });
  return response;
}

export async function updatePassword(password) {
  console.log("cambiando contraseña")
  const response = await api.put("/user/updatePassword",password , {
    headers: {
      "Authorization": localStorage.getItem("token"),
    },
  });
  return response;
}