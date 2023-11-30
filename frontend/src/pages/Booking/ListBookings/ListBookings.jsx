import './ListBookings.css';
import { useState, useEffect } from 'react'
import { getAllBookings } from '../../../services/booking';
import { getAllClassrooms } from '../../../services/classroom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import * as React from "react";

function ListBookings() {


  const [bookings, setBookings] = useState([])

  useEffect(() => {
    getBoookings()
  },[])

  async function getBoookings() {
    const data = await getAllBookings()
    setBookings(data);
    
     
  }


  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    getClassroom();
  }, []);

  async function getClassroom() {
    const dataClassroom = await getAllClassrooms();
    setClassrooms(dataClassroom);
  }


  const dataColumns = ["Referencia Reserva","Fecha", "Hora", "Aula", "Id Usuario"] // crea los campos que tendrá la cabecera manualmente
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };


  

  const clasrooms = {};
  classrooms.map(
    (classroom) => (clasrooms[classroom.id] = classroom.classroomName)
  );

 





  
  



  return (
    <div className='bodyVerReservas'>
      {bookings.length > 0 ? (
        <div className='tableBody'>
        <TableContainer className='tableContainer' >
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
                {dataColumns.map((column) => (
                <TableCell key={column} sx={{fontWeight: 'bold',
                backgroundColor: '#4E7FFF'}}  >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {bookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((booking)=> 
          {
    return (<TableRow hover role="checkbox" tabIndex={-1} key={booking.id}>
    <TableCell >{booking.id}</TableCell>
    <TableCell >{booking.bookingDate}</TableCell>
    <TableCell >{booking.bookingTime}</TableCell>
    <TableCell >{booking[clasrooms.classroomId]}</TableCell>
    <TableCell >{booking.userId}</TableCell>
  </TableRow>)
  })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 10, 25]}
        component="div"
        count={bookings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </div>
        





       ): (
        <h1 className="cuerpoListBookingNot">No Hay Reservas Disponibles</h1>
      )}
    </div>
      
    
    


    
    
  )
}

export default ListBookings