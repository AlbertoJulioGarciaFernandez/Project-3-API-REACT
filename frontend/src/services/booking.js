import api from ".";

export async function getAllBookings() {
  const {data} = await api.get("/booking", {
    headers:{
      "Authorization" : localStorage.getItem("token")
    }
  }
  )
  return data;
}

export async function addBooking(bookingAddData) {
    const response = await api.post("/booking", bookingAddData);
    return response;
  }
