import api from ".";

export async function getMyProfile() {
  const { data } = await api.get("/user/getProfile", {
    headers: {
      authorization: localStorage.token,
    },
  });
  return data;
}
