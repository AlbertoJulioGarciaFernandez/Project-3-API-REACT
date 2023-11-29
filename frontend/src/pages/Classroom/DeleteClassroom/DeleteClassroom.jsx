import { Alert, Box, Button, Card, CardActions, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import './DeleteClassroom.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteClassroom, getAllClassrooms } from '../../../services/classroom';

function DeleteClassroom() {
  useEffect(() => {
    getClassroomsAvailable();
  }, []);

  async function getClassroomsAvailable() {
    // API request with which we will get the list of classrooms available:
    const data = await getAllClassrooms();

    // Storing the different classrooms:
    setClassroom(data);
  }

  const [classrooms, setClassroom] = useState([]),
    [classroomId, setClassroomId] = useState(''),
    [classroomIdMsg, setClassroomIdMsg] = useState(''),
    [isError, setIsError] = useState(false),
    [confirmClassroomDeletion, setConfirmClassroomDeletion] = useState(false),
    [classroomDeleted, setClassroomDeleted] = useState(false),
    [errorMsg, setErrorMsg] = useState({}),
    navigate = useNavigate(),
    handleNavigate = () => {
      navigate("/dashboard/listClassrooms");
    },
    handleSelectChange = (e) => {
      setClassroomId(e.target.value.toString());
    },
    handleClick = async (e) => {
      e.preventDefault();

      if (classroomId === '') {
        setClassroomIdMsg('Error. +Info: Por favor, despliegue el menú «Código del aula» y seleccione un valor.');
      } else {
        setClassroomIdMsg('');
        // Confirm classroom deletion dialog window will pop up:
        setConfirmClassroomDeletion(true);
      }
    },
    handleProceedDeletion = async () => {
      setConfirmClassroomDeletion(false);
      try {
        await deleteClassroom(classroomId);
        setClassroomDeleted(true);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setErrorMsg(error);
      }
    },
    handleCancelDeletion = () => {
      setConfirmClassroomDeletion(false);
    }

  return (
    <Box sx={{
      alignItems: 'center',
      display: 'flex',
      height: '80vh',
      justifyContent: 'center',
    }}>
      <Card
        raised={true}
        component={'form'}
        sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'space-evenly', backgroundColor: '#c3d2fc', height: '50vh', width: '50vw' }}
      >
        <CardHeader titleTypographyProps={{ fontWeight: 'bold', fontSize: 30, borderBottom: '1px solid black', textAlign: 'center' }} title="Eliminación de aula"></CardHeader>

        {/* Important: To center the FormCOntrol, we will have to use the property «alignSelf». */}
        <FormControl size='large' sx={{ marginLeft: 2, width: 300, alignSelf: 'center' }}>
          <InputLabel required style={{ color: 'black', fontWeight: 'bolder', fontSize: 20, }} id="demo-simple-select-label">Código del aula</InputLabel>
          <Select
            title='Por favor, despliegue y seleccione el código del aula que desea eliminar'
            labelId="simple-select-classroom-id-label"
            id="simple-select"
            value={classroomId}
            label="Código aula"
            sx={{ backgroundColor: 'white' }}
            onChange={handleSelectChange}
          >
            {/* Dynamic generation of select option depending on the classrooms already registered on 
            the database: */}
            {classrooms.map(classroom => {
              return <MenuItem key={classroom.id} value={classroom.id}>Código {classroom.id} (Denominación: {classroom.classroomName})</MenuItem>
            })}
          </Select>
          {classroomIdMsg.includes('Error') && <Alert severity="error">{classroomIdMsg}</Alert>}
        </FormControl>

        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleClick}
            size="large"
            variant="contained"
            sx={{ backgroundColor: 'black' }}
          >
            Eliminar
          </Button>
        </CardActions>

        {isError && <Alert severity="error">Se ha producido un error interno al intentar eliminar el aula con código {classroomId}. +Info: {errorMsg}</Alert>}
        {classroomDeleted && <Alert severity="success">Operación realizada con éxito.</Alert>}

        {confirmClassroomDeletion && <Dialog
          style={{ position: 'absolute', left: 500, top: 100 }}
          open={confirmClassroomDeletion}
          onClose={handleProceedDeletion}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirmar eliminacion aula"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Se procederá a eliminar de la base de datos el aula con código «{classroomId}». Haga clic en «Aceptar» si desea proceder.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleProceedDeletion}>Aceptar</Button>
            <Button onClick={handleCancelDeletion}>Cancelar</Button>
          </DialogActions>
        </Dialog>}

        {classroomDeleted && <Dialog
          style={{ position: 'absolute', left: 600, top: 100 }}
          open={classroomDeleted}
          onClose={handleNavigate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Eliminación de aula"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              El aula con código {classroomId} se ha eliminado correctamente de la base de datos.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNavigate}>Cerrar</Button>
          </DialogActions>
        </Dialog>}
      </Card>

    </Box>
  )
}

export default DeleteClassroom