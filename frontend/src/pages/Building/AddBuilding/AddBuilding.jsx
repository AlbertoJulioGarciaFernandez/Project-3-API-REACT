import { Alert, Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, TextField } from '@mui/material';
import './AddBuilding.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBuilding } from '../../../services/building';

function AddBuilding() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getEquipmentAvailable();
  }, []);

  async function getEquipmentAvailable() {
    // API request with which we will get the list of pieces of equipment available:
    const data = await getAllEquipment();

    // Storing the different pieces of equipment:
    setUsers(data);
  }



  const [buildingName, setBuildingName] = useState(''),
    [buildingNameMsg, setBuildingNameMsg] = useState(''),
    [buildingAddress, setBuildingAddress] = useState(''),
    [buildingPhoneNumb, setBuildingPhoneNumb] = useState(''),
    [buildingProvidedServices, setBuildingProvidedServices] = useState(''),
    [buildingAdmin, setBuildingAdmin] = useState(''),
    [isError, setIsError] = useState(false),
    [buildingRegistered, setBuildingRegistered] = useState(false),
    [errorMsg, setErrorMsg] = useState({}),
    navigate = useNavigate(),
    handleNavigate = () => {
      navigate("/dashboard");
    },
    handleNameChange = (e) => {
      setBuildingName(e.target.value);
    },
    handleAddressChange = (e) => {
      setBuildingAddress(e.target.value);
    },
    handlePhoneNumbChange = (e) => {
      setBuildingPhoneNumb(e.target.value);
    },
    handleProvidedServicesChange = (e) => {
      // If the checkbox is checked:
      if (e.target.checked) {
        // We concatenate as many services as checkboxes are checked:
        setBuildingProvidedServices(buildingProvidedServices + e.target.labels[0].innerText + ', ');
      }
    },
    handleBuildingAdminChange = (e) => {
      setBuildingAdmin(e.target.value);
    },
    handleClick = async (e) => {
      e.preventDefault();

      if (buildingName === '') {
        setBuildingNameMsg('Error. +Info: El campo «Denominación» es de obligada cumplimentación.');
      } else {
        try {
          setBuildingNameMsg('');
          await createBuilding({ buildingName: buildingName, address: buildingAddress, phoneNumber: buildingPhoneNumb, providedServices: buildingProvidedServices, userId: });
          setBuildingName('');
          setBuildingRegistered(true);
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
        <CardHeader titleTypographyProps={{ fontWeight: 'bold', fontSize: 30, borderBottom: '1px solid black', textAlign: 'center' }} title="Alta de edificio"></CardHeader>
        <CardContent>

          <TextField
            className="textfield"
            onChange={handleNameChange}
            type="text"
            label="Denominación"
            margin="dense"
            title='Por favor, introduzca la denominación del edificio que desea dar de alta'
            required
            fullWidth={true}
            InputLabelProps={{ style: { color: 'black', fontWeight: 'bolder', fontSize: 20 } }}
            variant="filled"
          ></TextField>

          {buildingNameMsg.includes('Error') && <Alert severity="error">{buildingNameMsg}</Alert>}

          <TextField
            className="textfield"
            onChange={handleAddressChange}
            type="text"
            label="Direccion"
            margin="dense"
            title='Por favor, introduzca la dirección del edificio que desea dar de alta'
            fullWidth={true}
            InputLabelProps={{ style: { color: 'black', fontWeight: 'bolder', fontSize: 20 } }}
            variant="filled"
          ></TextField>

          <TextField
            className="textfield"
            onChange={handlePhoneNumbChange}
            type="text"
            label="Telefono"
            margin="dense"
            title='Por favor, introduzca el número de teléfono del edificio que desea dar de alta'
            fullWidth={true}
            InputLabelProps={{ style: { color: 'black', fontWeight: 'bolder', fontSize: 20 } }}
            variant="filled"
          ></TextField>
        </CardContent>

        <FormGroup title='Servicios disponibles' sx={{ marginLeft: 2, marginTop: 1 }}>
          <FormControlLabel onChange={handleProvidedServicesChange} componentsProps={{ typography: { variant: 'h6', fontWeight: 'bold' } }} control={<Checkbox />} label="Cafetería" />
          <FormControlLabel onChange={handleProvidedServicesChange} componentsProps={{ typography: { variant: 'h6', fontWeight: 'bold' } }} control={<Checkbox />} label="Biblioteca" />
          <FormControlLabel onChange={handleProvidedServicesChange} componentsProps={{ typography: { variant: 'h6', fontWeight: 'bold' } }} control={<Checkbox />} label="Salón de actos" />
        </FormGroup>


        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleClick}
            size="large"
            variant="contained"
            sx={{ backgroundColor: 'black' }}
          >
            Dar de alta
          </Button>
        </CardActions>

        {isError && <Alert severity="error">Se ha producido un error interno al intentar dar de alta el edificio {buildingName}. +Info: {errorMsg.response.data}</Alert>}
        {buildingRegistered && <Alert severity="success">Formulario cumplimentado correctamente.</Alert>}

        {buildingRegistered && <Dialog
          style={{ position: 'absolute', left: 500, top: 100 }}
          open={buildingRegistered}
          onClose={handleNavigate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Registro de edificio"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Edificio correctamente registrado.
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

export default AddBuilding