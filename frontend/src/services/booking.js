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

export async function getMyBookings() {
  const {data} = await api.get("/booking/getMyBookings", {
    headers:{
      "Authorization" : localStorage.getItem("token")
    }
  }
  )
  return data;
}

export async function addBooking({bookingDate, bookingTime, classroomId}) {
    const response = await api.post("/booking", {bookingDate, bookingTime, classroomId}
    , {
      headers:{
        "Authorization" : localStorage.getItem("token")
      },
      
    });
    return response;
  }


  export async function UpdateMyBooking({bookingDate, bookingTime, classroomId, id}) {
    console.log({bookingDate, bookingTime, classroomId, id})
    const response = await api.put(`/updateMyBooking/:${id}`, {bookingDate, bookingTime, classroomId}
    , {
      headers:{
        "Authorization" : localStorage.getItem("token")
      },
      
    });
    return response;
  }