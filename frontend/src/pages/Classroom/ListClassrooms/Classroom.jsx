import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getAllBuildings } from '../../../services/building';

function Classroom(props) {
  const dataColumns = ["Código", "Denominación", "Aforo", "Dirigida a", "Edificio de ubicación"],
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
    // Creating a state variable to store the
    // buildings we retrieve from the API:
    [buildingsRetrieved, setBuildings] = useState([]);

  let currentBuildingName = '';

  useEffect(() => {
    getBuildingsAvailable();
  }, []);

  async function getBuildingsAvailable() {
    // API request:
    const { buildings } = await getAllBuildings();

    // Storing the different pieces of equipment:
    setBuildings(buildings);
  }

  return (
    <Paper sx={styles.paper}>
      <TableContainer sx={styles.tableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead title='Aulario'>
            <TableRow>
              {dataColumns.map((column) => (
                <TableCell key={column} sx={styles.tableCell}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.existingClassrooms
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((classroom) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={classroom.id}>
                    <TableCell >{classroom.id}</TableCell>
                    <TableCell >{classroom.classroomName}</TableCell>
                    <TableCell >{classroom.capacity}</TableCell>
                    {classroom.aimedAt === 'student' && <TableCell >Alumnado</TableCell>}
                    {classroom.aimedAt === 'professor' && <TableCell >Profesorado</TableCell>}
                    {(classroom.aimedAt !== 'student' && classroom.aimedAt !== 'professor') && <TableCell ></TableCell>}

                    {buildingsRetrieved && buildingsRetrieved.filter(building => { if (building.id === classroom.buildingId) { currentBuildingName = building.buildingName } })}
                    {currentBuildingName !== '' && <TableCell >{currentBuildingName} (Código: {classroom.buildingId})</TableCell>}
                    {currentBuildingName === '' && <TableCell ></TableCell>}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 10, 25]}
        component="div"
        count={props.existingClassrooms.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

Classroom.propTypes = {
  existingClassrooms: PropTypes.array
}

export default Classroom