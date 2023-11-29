import { Alert, Box, Button, Card, CardActions, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import './DeleteBuilding.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBuilding, getAllBuildings } from '../../../services/building';

function DeleteBuilding() {
  useEffect(() => {
    getExistingBuildings();
  }, []);

  async function getExistingBuildings() {
    // API request:
    const { buildings } = await getAllBuildings();

    // Storing all the buildings:
    setBuildings(buildings);
  }

  const [buildings, setBuildings] = useState([]),
    [buildingId, setBuildingId] = useState(''),
    [buildingIdMsg, setBuildingIdMsg] = useState(''),
    [isError, setIsError] = useState(false),
    [confirmBuildingDeletion, setConfirmBuildingDeletion] = useState(false),
    [buildingDeleted, setBuildingDeleted] = useState(false),
    [errorMsg, setErrorMsg] = useState({}),
    navigate = useNavigate(),
    handleNavigate = () => {
      navigate("/dashboard/listBuildings");
    },
    handleSelectChange = (e) => {
      setBuildingId(e.target.value.toString());
    },
    handleClick = async (e) => {
      e.preventDefault();

      if (buildingId === '') {
        setBuildingIdMsg('Error. +Info: Por favor, despliegue el menú «Código del edificio» y seleccione un valor.');
      } else {
        setBuildingIdMsg('');
        // Confirm building deletion dialog window will pop up:
        setConfirmBuildingDeletion(true);
      }
    },
    handleProceedDeletion = async () => {
      setConfirmBuildingDeletion(false);
      try {
        await deleteBuilding(buildingId);
        setBuildingDeleted(true);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setErrorMsg(error);
      }
    },
    handleCancelDeletion = () => {
      setConfirmBuildingDeletion(false);
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
        <CardHeader titleTypographyProps={{ fontWeight: 'bold', fontSize: 30, borderBottom: '1px solid black', textAlign: 'center' }} title="Eliminación de edificio"></CardHeader>

        {/* Important: To center the FormControl, we will have to use the property «alignSelf». */}
        <FormControl size='large' sx={{ marginLeft: 2, width: 300, alignSelf: 'center' }}>
          <InputLabel style={{ color: 'black', fontWeight: 'bolder', fontSize: 20, }} id="demo-simple-select-label">Código del edificio</InputLabel>
          <Select
            title='Por favor, despliegue y seleccione el código del edificio que desea eliminar'
            labelId="simple-select-building-id-label"
            id="simple-select"
            value={buildingId}
            label="Código edificio"
            sx={{ backgroundColor: 'white' }}
            onChange={handleSelectChange}
          >
            {/* Dynamic generation of select option depending on the building already registered on 
            the database: */}
            {buildings.map(building => {
              return <MenuItem key={building.id} value={building.id}>Código: {building.id} (Denominación: {building.buildingName})</MenuItem>
            })}
          </Select>
          {buildingIdMsg.includes('Error') && <Alert severity="error">{buildingIdMsg}</Alert>}
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

        {isError && <Alert severity="error">Se ha producido un error interno al intentar eliminar el edificio con código {buildingId}. +Info: {errorMsg}</Alert>}
        {buildingDeleted && <Alert severity="success">Operación realizada con éxito.</Alert>}

        {confirmBuildingDeletion && <Dialog
          style={{ position: 'absolute', left: 500, top: 100 }}
          open={confirmBuildingDeletion}
          onClose={handleProceedDeletion}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirmar eliminacion edificio"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Se procederá a eliminar de la base de datos el edificio con código «{buildingId}». Haga clic en «Aceptar» si desea proceder.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleProceedDeletion}>Aceptar</Button>
            <Button onClick={handleCancelDeletion}>Cancelar</Button>
          </DialogActions>
        </Dialog>}

        {buildingDeleted && <Dialog
          style={{ position: 'absolute', left: 500, top: 100 }}
          open={buildingDeleted}
          onClose={handleNavigate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Eliminación de edificio"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              El edificio con código {buildingId} se ha eliminado correctamente de la base de datos.
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

export default DeleteBuilding