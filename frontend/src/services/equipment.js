import api from ".";

export async function getAllEquipment() {
  const { data } = await api.get("/equipment", {
    headers: {
      authorization: localStorage.token,
    },
  });
  return data;
}
