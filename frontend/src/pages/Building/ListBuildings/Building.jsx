import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getListUsers } from '../../../services/user';

function Building(props) {
  const dataColumns = ["Código", "Denominación", "Dirección", "Teléfono", "Servicios disponibles", "Administrador/a"], // crea los campos que tendrá la cabecera manualmente
    [page, setPage] = useState(0),
    [rowsPerPage, setRowsPerPage] = useState(10),
    handleChangePage = (event, newPage) => {
      setPage(newPage);
    },
    handleChangeRowsPerPage = (event) => {
      setRowsPerPage(event.target.value);
      setPage(0);
    },
    styles = {
      paper: {
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#cad5f3',
      },
      tableContainer: {
        maxHeight: 440,
        backgroundColor: '#DEE7FF',
      },
      tableCell: {
        fontWeight: 'bold',
        backgroundColor: '#4E7FFF',
      },
    },
    [usersRetrieved, setUsersRetrieved] = useState([]);

  let currentBuildingAdminName = '';

  useEffect(() => {
    getExistingUsers();
  }, []);

  async function getExistingUsers() {
    // API request:
    const { users } = await getListUsers();

    // Storing the different pieces of equipment:
    setUsersRetrieved(users);
  }

  return (
    <Paper sx={styles.paper}>
      <TableContainer sx={styles.tableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead title='Listado edificios'>
            <TableRow>
              {dataColumns.map((column) => (
                <TableCell key={column} sx={styles.tableCell}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.existingBuildings
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)//muestra que las paginas se vean de 10 en 10 o de 25 en 25  segun lo queramos en el select, partiendo de que la primera pagina empieza en 1 y termina en 9 y la segunda pagina empieza en 10 y termina en 19
              .map((building) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={building.id}>
                    <TableCell >{building.id}</TableCell>
                    <TableCell >{building.buildingName}</TableCell>
                    <TableCell >{building.address}</TableCell>
                    <TableCell >{building.phoneNumber}</TableCell>
                    <TableCell >{building.providedServices}</TableCell>
                    {usersRetrieved && usersRetrieved.filter(user => { if (user.id === building.userId) { currentBuildingAdminName = user.firstName + ' ' + user.lastName; } })}
                    {currentBuildingAdminName !== '' && <TableCell >{currentBuildingAdminName} (Código: {building.userId})</TableCell>}
                    {currentBuildingAdminName === '' && <TableCell ></TableCell>}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 10, 25]}
        component="div"
        count={props.existingBuildings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

Building.propTypes = {
  existingBuildings: PropTypes.array
}

export default Building