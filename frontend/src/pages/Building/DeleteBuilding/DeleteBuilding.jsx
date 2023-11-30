import { Alert, Box, Button, Card, CardActions, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
/* import './DeleteEquipment.css'; */
import './DeleteBuilding.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePieceEquipment, getAllEquipment } from '../../../services/equipment';

function DeleteEquipment() {
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
    [isError, setIsError] = useState(false),
    [equipmentDeleted, setEquipmentDeleted] = useState(false),
    [errorMsg, setErrorMsg] = useState({}),
    navigate = useNavigate(),
    handleNavigate = () => {
      navigate("/dashboard");
    },
    handleSelectChange = (e) => {
      setEquipmentId(e.target.value.toString());
    },
    handleClick = async (e) => {
      e.preventDefault();

      if (equipmentId === '') {
        setEquipmentIdMsg('Error. +Info: Por favor, despliegue el menú «Código del equipamiento» y seleccione un valor.');
      } else {
        try {
          setEquipmentIdMsg('');
          await deletePieceEquipment(equipmentId);
          setEquipmentDeleted(true);
          setIsError(false);
        } catch (error) {
          setIsError(true);
          setErrorMsg(error);
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
        <CardHeader titleTypographyProps={{ fontWeight: 'bold', fontSize: 30, borderBottom: '1px solid black', textAlign: 'center' }} title="Eliminación de equipamiento"></CardHeader>

        {/* Important: To center the FormCOntrol, we will have to use the property «alignSelf». */}
        <FormControl size='large' sx={{ marginLeft: 2, width: 300, alignSelf: 'center' }}>
          <InputLabel style={{ color: 'black', fontWeight: 'bolder', fontSize: 20, }} id="demo-simple-select-label">Código del equipamiento</InputLabel>
          <Select
            title='Por favor, seleccione el código del equipamiento que desea eliminar'
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

        {isError && <Alert severity="error">Se ha producido un error interno al intentar eliminar el equipamiento con código {equipmentId}. +Info: {errorMsg}</Alert>}
        {equipmentDeleted && <Alert severity="success">Operación realizada con éxito.</Alert>}

        {equipmentDeleted && <Dialog
          style={{ position: 'absolute', left: 500, top: 200 }}
          open={equipmentDeleted}
          onClose={handleNavigate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Eliminación de equipamiento"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              El equipamiento con código {equipmentId} se ha eliminado correctamente de la base de datos.
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

export default DeleteEquipment