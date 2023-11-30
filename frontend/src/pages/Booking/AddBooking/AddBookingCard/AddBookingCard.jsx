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
import { addBooking } from "../../../../services/booking";

function AddBookingCard({user,classroom}) {
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const [userId, setUserId] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // const role = localStorage.getItem("role");

  async function anadirBooking() {
    try {
      setMensaje("");
      setError("");
      const addMyBookingResponse = await addBooking({
        bookingDate: bookingDate,
        bookingTime: bookingTime,
        classroomId: classroomId,
        userId:userId
      });
      setMensaje(addMyBookingResponse.data.message);
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

  const handleChangeUser = (event) => {
    setUserId(event.target.value);
  };

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
      <CardHeader title="Crear Reserva" sx={{textAlign:"center"}} />
      <Divider/>
      <CardContent>
      <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="demo-simple-select-label" sx={{fontWeight:"bold"}} >Usuarios</InputLabel>
          <Select
            sx={{background:"white"}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userId}
            label="Usuarios"
            onChange={handleChangeUser}
          >
            {user
              .map((oneUser) => (
                <MenuItem key={oneUser.id} value={oneUser.id}>
                  {oneUser.email}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          type="date"
          sx={{ marginTop: "10px", background:"white", borderRadius:"5px" }}
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
            {classroom
              .map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.classroomName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => anadirBooking()} size="large" variant="contained" sx={{background:"black"}}>Crear Reserva</Button>
      </CardActions>

      {mensaje ? (
        <Alert severity="success">{mensaje}</Alert>
      ) : (
        error && <Alert severity="error">{error}</Alert>
      )}
    </Card>
  );
}

export default AddBookingCard;
