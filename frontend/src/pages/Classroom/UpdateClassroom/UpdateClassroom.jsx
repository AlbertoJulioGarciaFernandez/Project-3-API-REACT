import { Alert, Box, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, TextField, InputLabel, FormControl } from '@mui/material';
import './UpdateClassroom.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllClassrooms, updateClassroom } from '../../../services/classroom';
import { getAllBuildings } from '../../../services/building';

function UpdateClassroom() {

  useEffect(() => {
    getBuildingsAvailable();
  }, []);

  async function getBuildingsAvailable() {
    // API request with which we will get the list of buildings
    // available:
    const { buildings } = await getAllBuildings();
    // Storing the different pieces of equipment:
    setBuildingsRegistered(buildings);
  }

  useEffect(() => {
    getClassroomsAvailable();
  }, []);

  async function getClassroomsAvailable() {
    // API request:
    const data = await getAllClassrooms();

    // Storing the different classrooms:
    setClassrooms(data);
  }

  const [classrooms, setClassrooms] = useState([]),
    [buildingsRegistered, setBuildingsRegistered] = useState([]),
    [classroomName, setClassroomName] = useState(''),
    [classroomId, setClassroomId] = useState(''),
    [classroomIdMsg, setClassroomIdMsg] = useState(''),
    [classroomNameMsg, setClassroomNameMsg] = useState(''),
    [classroomCapacity, setClassroomCapacity] = useState(null),
    [classroomAimedAt, setClassroomAimedAt] = useState(null),
    [classroomBuildingId, setClassroomBuildingId] = useState(null),
    [isError, setIsError] = useState(false),
    [confirmClassroomUpdate, setConfirmClassroomUpdate] = useState(false),
    [classroomRegistered, setClassroomRegistered] = useState(false),
    [errorMsg, setErrorMsg] = useState({}),
    navigate = useNavigate(),
    handleNavigate = () => {
      navigate("/dashboard/listClassrooms");
    },
    handleNameChange = (e) => {
      setClassroomName(e.target.value);
    },
    handleCapacityChange = (e) => {
      setClassroomCapacity(e.target.value);
    },
    handleSelectAimedAtChange = (e) => {
      setClassroomAimedAt(e.target.value);
    },
    handleSelectBuildingChange = (e) => {
      setClassroomBuildingId(e.target.value);
    },
    handleSelectIdChange = (e) => {
      setClassroomId(e.target.value.toString());
    },
    handleClick = async (e) => {
      e.preventDefault();

      if (classroomId === '') {
        setClassroomIdMsg('Error. +Info: Por favor, despliegue el menú «Código del aula y seleccione un valor.');
      } else {
        setClassroomIdMsg('');

        if (classroomName === '') {
          setClassroomNameMsg('Error. +Info: El campo «Denominación» es de obligada cumplimentación.');
        } else {
          setClassroomNameMsg('');
          // Confirm classroom update dialog window will pop up:
          setConfirmClassroomUpdate(true);

        }
      }
    },
    handleProceedUpdate = async () => {
      setConfirmClassroomUpdate(false);
      try {
        setClassroomNameMsg('');
        await updateClassroom(classroomId, { classroomName: classroomName, capacity: classroomCapacity, aimedAt: classroomAimedAt, buildingId: classroomBuildingId });
        setClassroomName('');
        setClassroomRegistered(true);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setErrorMsg(error);
      }
    },
    handleCancelUpdate = () => {
      setConfirmClassroomUpdate(false);
    };

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
        sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'space-evenly', backgroundColor: '#c3d2fc', height: '70vh', width: '50vw' }}
      >
        <CardHeader titleTypographyProps={{ fontWeight: 'bold', fontSize: 30, borderBottom: '1px solid black', textAlign: 'center' }} title="Actualización de aula"></CardHeader>

        <FormControl size='large' sx={{ marginLeft: 2, marginBottom: -1, width: 300 }}>
          <InputLabel required style={{ color: 'black', fontWeight: 'bolder', fontSize: 20 }} id="demo-simple-select-label">Código del aula</InputLabel>
          <Select
            title='Por favor, despliegue y seleccione el código del aula que desea actualizar'
            labelId="simple-select-classroom-id-label"
            id="simple-select"
            value={classroomId}
            label="Código aula"
            sx={{ backgroundColor: 'white' }}
            onChange={handleSelectIdChange}
          >
            {/* Dynamic generation of select option depending on the classrooms already registered on 
            the database: */}
            {classrooms.map(classroom => {
              return <MenuItem key={classroom.id} value={classroom.id}>Código: {classroom.id} (Denominación: {classroom.classroomName})</MenuItem>
            })}
          </Select>
          {classroomIdMsg.includes('Error') && <Alert severity="error">{classroomIdMsg}</Alert>}
        </FormControl>

        <CardContent>
          <TextField
            className="textfield"
            onChange={handleNameChange}
            type="text"
            title='Por favor, introduzca el nuevo nombre de aula'
            label="Denominación"
            margin="dense"
            required
            fullWidth={true}
            InputLabelProps={{ style: { color: 'black', fontWeight: 'bolder', fontSize: 20 } }}
            variant="filled"
          ></TextField>

          {classroomNameMsg.includes('Error') && <Alert severity="error">{classroomNameMsg}</Alert>}

          <TextField
            className="textfield"
            onChange={handleCapacityChange}
            type="number"
            label="Aforo"
            margin="dense"
            title='Por favor, seleccione el aforo del aula que desea modificar (valor mínimo: 10 — valor máximo: 50)'
            fullWidth={true}
            value={(classroomCapacity === null) ? '' : classroomCapacity}
            InputProps={{ inputProps: { min: 10, max: 50 } }}
            InputLabelProps={{ style: { color: 'black', fontWeight: 'bolder', fontSize: 20 } }}
            variant="filled"
          ></TextField>


        </CardContent>

        <FormControl size='large' sx={{ marginBottom: 1, marginLeft: 2, marginTop: 1, width: 300 }}>
          <InputLabel style={{ color: 'black', fontWeight: 'bolder', fontSize: 20 }} id="demo-simple-select-label">Dirigida a</InputLabel>
          <Select
            title='Por favor, despliegue y seleccione el público al que está dirigido el aula que desea actualizar'
            labelId="simple-select-classroom-id-label"
            id="simple-select"
            value={classroomAimedAt === null ? '' : classroomAimedAt}
            label="Dirigida a"
            sx={{ backgroundColor: 'white' }}
            onChange={handleSelectAimedAtChange}
          >
            <MenuItem value={'student'}>Alumnado</MenuItem>
            <MenuItem value={'professor'}>Profesorado</MenuItem>
          </Select>
        </FormControl>

        <FormControl size='large' sx={{ marginBottom: 1, marginLeft: 2, marginTop: 1, width: 300 }}>
          <InputLabel style={{ color: 'black', fontWeight: 'bolder', fontSize: 20 }} id="demo-simple-select-label">Edificio de ubicación</InputLabel>
          <Select
            title='Por favor, despliegue y seleccione el edificio donde estará ubicado el aula que desea actualizar'
            labelId="simple-select-classroom-id-label"
            id="simple-select"
            value={classroomBuildingId === null ? '' : classroomBuildingId}
            label="Edificio ubicacion"
            sx={{ backgroundColor: 'white' }}
            onChange={handleSelectBuildingChange}
          >
            {/* Dynamic generation of select option depending on the buildings already registered on the database: */}
            {buildingsRegistered.map(building => {
              return <MenuItem key={building.id} value={building.id}>{building.buildingName} (ID: {building.id})</MenuItem>
            })}
          </Select>
        </FormControl>

        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleClick}
            size="large"
            variant="contained"
            sx={{ backgroundColor: 'black' }}
          >
            Actualizar
          </Button>
        </CardActions>

        {isError && <Alert severity="error">Se ha producido un error interno al intentar actualizar el aula con código {classroomId}. +Info: {errorMsg.response.data}</Alert>}
        {classroomRegistered && <Alert severity="success">Formulario cumplimentado correctamente.</Alert>}

        {confirmClassroomUpdate && <Dialog
          style={{ position: 'absolute', left: 500, top: 100 }}
          open={confirmClassroomUpdate}
          onClose={handleProceedUpdate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirmar actualización de aula"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Se procederá a actualizar el aula código {classroomId} con los datos que ha cumplimentado. Haga clic en «Aceptar» si desea proceder.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleProceedUpdate}>Aceptar</Button>
            <Button onClick={handleCancelUpdate}>Cancelar</Button>
          </DialogActions>
        </Dialog>}

        {classroomRegistered && <Dialog
          style={{ position: 'absolute', left: 500, top: 100 }}
          open={classroomRegistered}
          onClose={handleNavigate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Actualización de aula"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              El aula con código {classroomId} se ha actualizado correctamente en la base de datos.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNavigate}>Cerrar</Button>
          </DialogActions>
        </Dialog>}
      </Card>
    </Box>
  );
}

export default UpdateClassroom