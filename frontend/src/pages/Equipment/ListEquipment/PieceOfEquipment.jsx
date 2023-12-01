import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

function PieceOfEquipment(props) {
  const dataColumns = ["Código", "Denominación", "Descripción"],
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
    };

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
            {props.equipmentAvailable
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pieceOfEquipment) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={pieceOfEquipment.id}>
                    <TableCell >{pieceOfEquipment.id}</TableCell>
                    <TableCell >{pieceOfEquipment.equipmentName}</TableCell>
                    <TableCell >{pieceOfEquipment.description}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 10, 25]}
        component="div"
        count={props.equipmentAvailable.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

PieceOfEquipment.propTypes = {
  equipmentAvailable: PropTypes.array
}

export default PieceOfEquipment