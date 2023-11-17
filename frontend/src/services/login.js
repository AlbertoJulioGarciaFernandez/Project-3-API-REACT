import api from ".";

export async function login(loginData) {
    const response = await api.post('/auth/login', loginData)
    return response
  }