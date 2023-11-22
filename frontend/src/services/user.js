import api from ".";

export async function getMyProfile() {
  const response = await api.get("/user/getProfile");
  console.log('entra')
  return response;
}
