import { Alert, Box, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, TextField, InputLabel, FormControl } from '@mui/material';
import './UpdateClassroom.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEquipment, updatePieceEquipment } from '../../../services/equipment';

function UpdateClassroom() {

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
    [equipmentRegistered, setEquipmentRegistered] = useState(false),
    [errorMsg, setErrorMsg] = useState({}),
    navigate = useNavigate(),
    handleNavigate = () => {
      navigate("/dashboard");
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
          try {
            setEquipmentNameMsg('');
            await updatePieceEquipment({ equipmentId: equipmentId, equipmentName: equipmentName, description: equipmentDescription });
            setEquipmentName('');
            setEquipmentRegistered(true);
            setIsError(false);
          } catch (error) {
            setIsError(true);
            setErrorMsg(error);
          }
        }
      }
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
              return <MenuItem key={pieceOfEquipment.id} value={pieceOfEquipment.id}>{pieceOfEquipment.id}</MenuItem>
            })}
          </Select>
          {equipmentIdMsg.includes('Error') && <Alert severity="error">{equipmentIdMsg}</Alert>}
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
            fullWidth={true}
            InputLabelProps={{ style: { color: 'black', fontWeight: 'bolder', fontSize: 20 } }}
            variant="filled"
          ></TextField>

          {equipmentNameMsg.includes('Error') && <Alert severity="error">{equipmentNameMsg}</Alert>}

          <TextField
            className="textfield"
            onChange={handleDescriptionChange}
            type="text"
            title='Por favor, introduzca la nueva descripción del equipamiento'
            label="Descripción"
            margin="dense"
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

        {isError && <Alert severity="error">Se ha producido un error interno al intentar actualizar el equipamiento {equipmentName}. +Info: {errorMsg.response.data.message}</Alert>}
        {equipmentRegistered && <Alert severity="success">Formulario cumplimentado correctamente.</Alert>}

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

export default UpdateClassroom