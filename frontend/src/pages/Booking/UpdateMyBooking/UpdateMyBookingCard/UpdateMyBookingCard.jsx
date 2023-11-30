import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { UpdateMyBooking } from "../../../../services/booking";

function UpdateMyBookingCard(props) {
  const [bookingSelect, setBookingSelect] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");



  const role = localStorage.getItem("role");

  async function addMyBooking() {
    try {
      setError("");
      setMensaje("");
      const addMyBookingResponse = await UpdateMyBooking({
        bookingDate: bookingDate,
        bookingTime: bookingTime,
        classroomId: classroomId,
        bookingId: bookingSelect.id,
      });
      setMensaje(addMyBookingResponse.data);
      props.functRefres();
      setBookingDate("");
      setBookingSelect("");
      setBookingTime("");
      setClassroomId("");

      //Do something with the response
    } catch (error) {
      setError(error.response.data);
    }
  }

  const handleChangeAge = (event) => {
    let fechaFormateada = event.target.value;
    setBookingDate(fechaFormateada);
  };

  const handleChangeHora = (event) => {
    setBookingTime(event.target.value);
  };

  const handleChangeRoom = (event) => {
    setClassroomId(event.target.value);
  };

  const handleChangeSelect = (event) => {
    setBookingSelect(event.target.value);
    setBookingTime(event.target.value.bookingTime);
    setClassroomId(event.target.value.classroomId);
    setBookingDate(event.target.value.bookingDate);
  };

  function claseCardDate(booking) {
    function fechaHoy() {
      const fecha = new Date();
      const day = fecha.getDate();
      const month = fecha.getMonth() + 1;
      const year = fecha.getFullYear();
      return `${year}-${month}-${day}`;
    }

    function horaActual() {
      const fecha = new Date();
      const hora = fecha.getHours();
      const minutos = fecha.getMinutes();
      return `${hora}:${minutos}`;
    }

    if (fechaHoy() < booking.bookingDate) {
      return true;
    } else if (fechaHoy() === booking.bookingDate) {
      if (horaActual() < booking.bookingTime) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const clasrooms = {};
  props.classroom
    .filter((booking) => booking.aimedAt === role)
    .map((classroom) => (clasrooms[classroom.id] = classroom.classroomName));

  const myBokkings = props.booking.filter((booking)=>claseCardDate(booking))
    .map((booking) => (
      <MenuItem key={booking.id} value={booking}>
        Referencia:{booking.id} | Fecha:{booking.bookingDate} | Hora:
        {booking.bookingTime} | {clasrooms[booking.classroomId]}
      </MenuItem>
    ))
    .reverse();

  const horarios = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  return (
    <Card sx={{ width: "500px", background: "#DEE7FF" }}>
      <CardHeader title="Modificar Reserva" sx={{textAlign:"center"}} />
      <Divider/>
      <CardContent>
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="demo-simple-select-label" sx={{fontWeight:"bold"}}>
            Referencia Reserva
          </InputLabel>
          <Select
          sx={{background:"white"}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bookingSelect}
            label="Referencia Reserva"
            onChange={handleChangeSelect}
          >
            {myBokkings}
          </Select>
        </FormControl>

        <TextField
          sx={{ marginTop: "10px", background:"white" }}
          
          type="date"
          value={bookingDate}
          onChange={handleChangeAge}
          slotProps={{
            input: {
              min: "2018-06-07T00:00",
              max: "2018-06-14T00:00",
            },
          }}
        />
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="demo-simple-select-label" sx={{fontWeight:"bold"}}>Horario</InputLabel>
          <Select
          sx={{background:"white"}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bookingTime}
            label="Horario"
            onChange={handleChangeHora}
          >
            {horarios.map((hora) => (
              <MenuItem key={hora} value={hora}>
                {hora}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="demo-simple-select-label" sx={{fontWeight:"bold"}}>Clase</InputLabel>
          <Select
            sx={{background:"white"}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={classroomId}
            label="Clase"
            onChange={handleChangeRoom}
          >
            {props.classroom
              .filter((booking) => booking.aimedAt === role)
              .map((classroom) => (
                <MenuItem key={classroom.id} value={classroom.id}>
                  {classroom.classroomName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => addMyBooking()} size="large" variant="contained" sx={{background:"black"}}>Modificar Reserva</Button>
      </CardActions>

      {mensaje ? (
        <Alert severity="success">{mensaje}</Alert>
      ) : (
        error && <Alert severity="error">{error}</Alert>
      )}
    </Card>
  );
}

export default UpdateMyBookingCard;
