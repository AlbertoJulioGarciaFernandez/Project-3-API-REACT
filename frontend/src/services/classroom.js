import api from ".";

export async function getAllClassroom() {
  const {data} = await api.get("/classroom", {
    headers:{
      "Authorization" : localStorage.getItem("token")
    }
  }
  )
  return data;
}