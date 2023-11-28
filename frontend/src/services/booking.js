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


export async function addMyBooking({bookingDate, bookingTime, classroomId}) {
    const response = await api.post("/booking", {bookingDate, bookingTime, classroomId}
    , {
      headers:{
        "Authorization" : localStorage.getItem("token")
      },
      
    });
    return response;
  }

  export async function addBooking({bookingDate, bookingTime, classroomId, userId}) {
    const response = await api.post(`/booking/${userId}`, {bookingDate, bookingTime, classroomId}
    , {
      headers:{
        "Authorization" : localStorage.getItem("token")
      },
      
    });
    return response;
  }


  export async function UpdateMyBooking({bookingDate, bookingTime, classroomId, bookingId}) {
    console.log({bookingDate, bookingTime, classroomId, bookingId})
    const response = await api.put(`/booking/updateMyBooking/${bookingId}`, {bookingDate, bookingTime, classroomId}
    , {
      headers:{
        "Authorization" : localStorage.getItem("token")
      },
      
    });
    return response;
  }

  export async function UpdateBooking({bookingDate, bookingTime, classroomId, bookingId,  userId}) {
    console.log({bookingDate, bookingTime, classroomId, bookingId, userId})
    const response = await api.put(`/booking/${bookingId}`, {bookingDate, bookingTime, classroomId, userId}
    , {
      headers:{
        "Authorization" : localStorage.getItem("token")
      },
      
    });
    return response;
  }

  export async function DeleteMyBooking({bookingId}) {
    const response = await api.delete(`/booking/deleteMyBooking/${bookingId}`, 
     {
      headers:{
        "Authorization" : localStorage.getItem("token")
      },
      
    });
    return response;
  }


  export async function DeleteBooking({bookingId}) {
    const response = await api.delete(`/booking/deleteMyBooking/${bookingId}`, 
     {
      headers:{
        "Authorization" : localStorage.getItem("token")
      },
      
    });
    return response;
  }