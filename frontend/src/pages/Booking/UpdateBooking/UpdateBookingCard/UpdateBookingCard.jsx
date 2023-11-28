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
import { UpdateBooking } from "../../../../services/booking";

function UpdateBookingCard(props) {
  const [bookingId, setbookingId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const [userId, setUserId] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const role = localStorage.getItem("role");

  async function addMyBooking() {
    try {
      setError("");
      setMensaje("");
      const addBookingResponse = await UpdateBooking({
        bookingDate: bookingDate,
        bookingTime: bookingTime,
        classroomId: classroomId,
        bookingId: bookingId,
        userId:userId

      });
      setMensaje(addBookingResponse.data);

      //Do something with the response
    } catch (error) {
      setError(error.response.data);
    }
  }

  const convertirFormatoFecha = (fechaDMY) => {
    const partesFecha = fechaDMY.split("-"); // Divide la fecha en sus partes: día, mes, año
    const dia = partesFecha[0];
    const mes = partesFecha[1];
    const año = partesFecha[2];

    // Formatea la fecha en formato año-mes-día (YYYY-MM-DD)
    const fechaYMD = `${año}/${mes}/${dia}`;
    return fechaYMD;
  };

  const handleChangeAge = (event) => {
    let fechaFormateada = convertirFormatoFecha(event.target.value);
    setBookingDate(fechaFormateada);
  };

  const handleChangeHora = (event) => {
    setBookingTime(event.target.value);
  };

  const handleChangeRoom = (event) => {
    setClassroomId(event.target.value);
  };

  const handleChangeId = (event) => {
    setbookingId(event.target.value);
    setUserId(user[event.target.value])
    
  };

  const clasrooms = {};
  props.classroom
    .map((classroom) => (clasrooms[classroom.id] = classroom.classroomName));

    const user = {};
    props.booking
      .map((booking) => (user[booking.id] = booking.userId));

  

  const myBokkings = props.booking
    .map((booking) => (
      <MenuItem key={booking} value={booking.id}>
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
      <CardHeader title="Modificar Reserva" />
      <CardContent>
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="demo-simple-select-label">
            Referencia Reserva
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bookingId}
            label="Referencia Reserva"
            onChange={handleChangeId}
          >
            {myBokkings}
          </Select>
        </FormControl>
        <TextField
          sx={{ marginTop: "10px" }}
          type="date"
          onChange={handleChangeAge}
          slotProps={{
            input: {
              min: "2018-06-07T00:00",
              max: "2018-06-14T00:00",
            },
          }}
        />
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="demo-simple-select-label">Horario</InputLabel>
          <Select
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
          <InputLabel id="demo-simple-select-label">Clase</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={classroomId}
            label="Clase"
            onChange={handleChangeRoom}
          >
            {props.classroom
              .map((classroom) => (
                <MenuItem key={classroom.id} value={classroom.id}>
                  {classroom.classroomName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </CardContent>
      <Divider />
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => addMyBooking()}>Modificar Reserva</Button>
      </CardActions>

      {mensaje ? (
        <Alert severity="success">{mensaje}</Alert>
      ) : (
        error && <Alert severity="error">{error}</Alert>
      )}
    </Card>
  );
}

export default UpdateBookingCard;
