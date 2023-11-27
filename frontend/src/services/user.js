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
  console.log(user)
  const response = await api.post("/auth/signup", user, {
    headers: {
      "Authorization": localStorage.getItem("token"),
    },
  });
  return response;
}
