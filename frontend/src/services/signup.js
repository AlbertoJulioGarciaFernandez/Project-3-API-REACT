import api from ".";

export async function signup(signUpData) {
  const response = await api.post("/auth/signup", signUpData);
  return response;
}
