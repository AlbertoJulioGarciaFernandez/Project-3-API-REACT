import { Alert, Box, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, TextField, InputLabel, FormControl } from '@mui/material';
import './UpdateEquipment.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEquipment, updatePieceEquipment } from '../../../services/equipment';

function UpdateEquipment() {

  useEffect(() => {
    getEquipmentAvailable();
  }, []);

  async function getEquipmentAvailable() {
    // API request with which we will get the list of pieces of equipment available:
    const data = await getAllEquipment();

    // Storing the different pieces of equipment:
    setEquipment(data);
  }

  const [equipment, setEquipment] = useState([]),
    [equipmentId, setEquipmentId] = useState(''),
    [equipmentIdMsg, setEquipmentIdMsg] = useState(''),
    [equipmentName, setEquipmentName] = useState(''),
    [equipmentNameMsg, setEquipmentNameMsg] = useState(''),
    [equipmentDescription, setEquipmentDescription] = useState(''),
    [isError, setIsError] = useState(false),
    [confirmPieceOfEquipmentUpdate, setConfirmPieceOfEquipmentUpdate] = useState(false),
    [equipmentRegistered, setEquipmentRegistered] = useState(false),
    [errorMsg, setErrorMsg] = useState({}),
    navigate = useNavigate(),
    handleNavigate = () => {
      navigate("/dashboard/listEquipment");
    },
    handleNameChange = (e) => {
      setEquipmentName(e.target.value);
    },
    handleDescriptionChange = (e) => {
      setEquipmentDescription(e.target.value);
    },
    handleSelectChange = (e) => {
      setEquipmentId(e.target.value.toString());
    },
    handleClick = async (e) => {
      e.preventDefault();

      if (equipmentId === '') {
        setEquipmentIdMsg('Error. +Info: Por favor, despliegue el menú «Código del equipamiento» y seleccione un valor.');
      } else {
        setEquipmentIdMsg('');

        if (equipmentName === '') {
          setEquipmentNameMsg('Error. +Info: El campo «Denominación» es de obligada cumplimentación.');
        } else {
          setEquipmentNameMsg('');
          // Confirm piece of equipment update dialog window will pop up:
          setConfirmPieceOfEquipmentUpdate(true);
        }
      }
    },
    handleProceedUpdate = async () => {
      setConfirmPieceOfEquipmentUpdate(false);
      try {
        setEquipmentNameMsg('');
        await updatePieceEquipment(equipmentId, { equipmentName: equipmentName, description: equipmentDescription });
        setEquipmentName('');
        setEquipmentRegistered(true);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setErrorMsg(error);
      }
    },
    handleCancelUpdate = () => {
      setConfirmPieceOfEquipmentUpdate(false);
    },
    handleCleanInput = () => {
      setEquipmentName('');
      setEquipmentDescription('');
      setEquipmentNameMsg('');
      // To reset equipment code drop-down menu:
      setEquipmentId('');
      setEquipmentIdMsg('');
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
        sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'space-evenly', backgroundColor: '#c3d2fc', height: '70vh', width: '60vw' }}
      >
        <CardHeader titleTypographyProps={{ fontWeight: 'bold', fontSize: 30, borderBottom: '1px solid black', textAlign: 'center' }} title="Actualización de equipamiento"></CardHeader>

        <FormControl size='large' sx={{ marginLeft: 2, marginBottom: -1, width: 300 }}>
          <InputLabel required style={{ color: 'black', fontWeight: 'bolder', fontSize: 20 }} id="demo-simple-select-label">Código del equipamiento</InputLabel>
          <Select
            title='Por favor, despliegue y seleccione el código del equipamiento que desea actualizar'
            labelId="simple-select-equipment-id-label"
            id="simple-select"
            value={equipmentId}
            label="Código equipamiento"
            sx={{ backgroundColor: 'white' }}
            onChange={handleSelectChange}
          >
            {/* Dynamic generation of select option depending on the equipment already registered on 
            the database: */}
            {equipment.map(pieceOfEquipment => {
              return <MenuItem key={pieceOfEquipment.id} value={pieceOfEquipment.id}>Código: {pieceOfEquipment.id} (Denominación: {pieceOfEquipment.equipmentName})</MenuItem>
            })}
          </Select>
          {equipmentIdMsg.includes('Error') && <Alert severity="error">{equipmentIdMsg}</Alert>}
          {equipmentIdMsg.includes('Error') && <Alert severity="error">Los campos señalados con asterisco (*) son de obligada cumplimentación.</Alert>}
        </FormControl>

        <CardContent>
          <TextField
            className="textfield"
            onChange={handleNameChange}
            type="text"
            title='Por favor, introduzca el nuevo nombre de equipamiento'
            label="Denominación"
            margin="dense"
            required
            value={equipmentName}
            fullWidth={true}
            InputLabelProps={{ style: { color: 'black', fontWeight: 'bolder', fontSize: 20 } }}
            variant="filled"
          ></TextField>

          {equipmentNameMsg.includes('Error') && <Alert severity="error">{equipmentNameMsg}</Alert>}
          {equipmentNameMsg.includes('Error') && <Alert severity="error">Los campos señalados con asterisco (*) son de obligada cumplimentación.</Alert>}

          <TextField
            className="textfield"
            onChange={handleDescriptionChange}
            type="text"
            title='Por favor, introduzca la nueva descripción del equipamiento'
            label="Descripción"
            margin="dense"
            value={equipmentDescription}
            fullWidth={true}
            InputLabelProps={{ style: { color: 'black', fontWeight: 'bolder', fontSize: 20 } }}
            variant="filled"
          ></TextField>
        </CardContent>

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

        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleCleanInput}
            size="large"
            type='reset'
            variant="contained"
            sx={{ backgroundColor: 'black' }}
          >
            Limpiar formulario
          </Button>
        </CardActions>

        {isError && <Alert severity="error">Se ha producido un error interno al intentar actualizar el equipamiento con código {equipmentId}. +Info: {errorMsg.response.data.message}</Alert>}
        {equipmentRegistered && <Alert severity="success">Formulario cumplimentado correctamente.</Alert>}

        {confirmPieceOfEquipmentUpdate && <Dialog
          style={{ position: 'absolute', left: 500, top: 100 }}
          open={confirmPieceOfEquipmentUpdate}
          onClose={handleProceedUpdate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirmar actualización de equipamiento"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Se procederá a actualizar el equipamiento código {equipmentId} con los datos que ha cumplimentado. Haga clic en «Aceptar» si desea proceder.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleProceedUpdate}>Aceptar</Button>
            <Button onClick={handleCancelUpdate}>Cancelar</Button>
          </DialogActions>
        </Dialog>}

        {equipmentRegistered && <Dialog
          style={{ position: 'absolute', left: 500, top: 100 }}
          open={equipmentRegistered}
          onClose={handleNavigate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Actualización de equipamiento"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              El equipamiento con código {equipmentId} se ha actualizado correctamente en la base de datos.
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

export default UpdateEquipment