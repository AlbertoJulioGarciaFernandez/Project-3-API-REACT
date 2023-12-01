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
} from "@mui/material";
import { useState } from "react";
import { DeleteBooking} from "../../../../services/booking";
import PropTypes from 'prop-types';

function DeleteBookingCard(props) {
  const [bookingId, setbookingId] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const role = localStorage.getItem("role");

  async function addMyBooking() {
    try {
      setError("");
      setMensaje("");
      const addMyBookingResponse = await DeleteBooking({
        bookingId: bookingId,
      });
      setMensaje(addMyBookingResponse.data);
      console.log(addMyBookingResponse.data);
      props.functRefres()

      //Do something with the response
    } catch (error) {
      setError(error.response.data);
      console.log(error);
    }
  }

  const handleChangeId = (event) => {
    setbookingId(event.target.value);
  };

  const clasrooms = {};
  props.classroom
    .filter((booking) => booking.aimedAt === role)
    .map((classroom) => (clasrooms[classroom.id] = classroom.classroomName));

  const myBokkings = props.booking
    .map((booking) => (
      <MenuItem key={booking.id} value={booking.id}>
        Referencia:{booking.id} | Fecha:{booking.bookingDate} | Hora:
        {booking.bookingTime} | {clasrooms[booking.classroomId]}
      </MenuItem>
    ))
    .reverse();

  return (
    <Card sx={{ width: "500px", background: "#DEE7FF" }}>
      <CardHeader title="Eliminar Reserva" sx={{textAlign:"center"}} />
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
            value={bookingId}
            label="Referencia Reserva"
            onChange={handleChangeId}
          >
            {myBokkings}
          </Select>
        </FormControl>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => addMyBooking()} size="large" variant="contained" sx={{background:"black"}}>Eliminar Reserva</Button>
      </CardActions>

      {mensaje ? (
        <Alert severity="success">{mensaje}</Alert>
      ) : (
        error && <Alert severity="error">{error}</Alert>
      )}
    </Card>
  );
}

DeleteBookingCard.propTypes = {
  classroom: PropTypes.object,
  booking:PropTypes.object,
  functRefres:PropTypes.func
}


export default DeleteBookingCard;
