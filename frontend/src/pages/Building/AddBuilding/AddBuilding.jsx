import { Alert, Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import './AddBuilding.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBuilding } from '../../../services/building';
import { getListUsers } from '../../../services/user';

function AddBuilding() {

  useEffect(() => {
    getExistingUsers();
  }, []);

  async function getExistingUsers() {
    // API request:
    const { users } = await getListUsers(),
      // Now, it is time to filter the users who are building administrators filtering
      // by role:
      buildingAdmins = users.filter(user => user.role === 'buildingAdmin');

    // Storing all the users who are building administrators:
    setBuildingAdmins(buildingAdmins);
  }

  const [buildingName, setBuildingName] = useState(''),
    [buildingNameMsg, setBuildingNameMsg] = useState(''),
    [buildingAddress, setBuildingAddress] = useState(''),
    [buildingPhoneNumb, setBuildingPhoneNumb] = useState(''),
    [buildingProvidedServices, setBuildingProvidedServices] = useState([]),
    [buildingAdmins, setBuildingAdmins] = useState([]),
    [isChecked, setIsCheked] =useState(false),
    // Important: In order not to get a 404 error from the API building controller
    // (createBuilding function), the useState belonging to «buildingAdminId» has to be
    // EMPTY, not simple quotation. The reason is that the controller will check whether
    // the userId (building administrator id) is or not UNDEFINED and, somehow, if we
    // write a value other than leaving useState empty, an error will occur if we do
    // not select a building administrator in the form:
    [buildingAdminId, setBuildingAdminId] = useState(),
    [isError, setIsError] = useState(false),
    [confirmBuildingRegistration, setConfirmBuildingRegistration] = useState(false),
    [buildingRegistered, setBuildingRegistered] = useState(false),
    [errorMsg, setErrorMsg] = useState({}),
    navigate = useNavigate(),
    handleNavigate = () => {
      navigate("/dashboard/listBuildings");
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
        // We include in the array as many services as checkboxes are checked as long
        // as these services are NOT already stored in the array:
        if (!buildingProvidedServices.includes(e.target.labels[0].innerText)) {
          setBuildingProvidedServices((cv) => [...cv, e.target.labels[0].innerText]);
        }
      }

      if (!e.target.checked) {
        // We delete from the array as many services as checkboxes are unchecked:
        if (buildingProvidedServices.includes(e.target.labels[0].innerText)) {
          const result = buildingProvidedServices.filter(providedService => providedService !== e.target.labels[0].innerText);
          setBuildingProvidedServices(result)
        }
      }
    },
    handleSelectBuildingAdminChange = (e) => {
      setBuildingAdminId(e.target.value);
    },
    handleClick = async (e) => {
      e.preventDefault();

      if (buildingName === '') {
        setBuildingNameMsg('Error. +Info: El campo «Denominación» es de obligada cumplimentación.');
      } else {
        setBuildingNameMsg('');
        // Confirm building registration dialog window will pop up:
        setConfirmBuildingRegistration(true);
      }
    },
    handleProceedRegistration = async () => {
      setConfirmBuildingRegistration(false);
      try {
        let buildingServices = buildingProvidedServices.join(', ');
        await createBuilding({ buildingName: buildingName, address: buildingAddress, phoneNumber: buildingPhoneNumb, providedServices: buildingServices, userId: buildingAdminId });
        setBuildingName('');
        setBuildingRegistered(true);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setErrorMsg(error);
      }
    },
    handleCancelRegistration = () => {
      setConfirmBuildingRegistration(false);
    },
    handleCleanCheckBox = () => {
      setIsCheked(false)
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
        sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'space-evenly', backgroundColor: '#c3d2fc', height: '70vh', width: '50vw' }}
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
          <FormControlLabel checked={isChecked} onChange={handleProvidedServicesChange} componentsProps={{ typography: { variant: 'h6', fontWeight: 'bold' } }} control={<Checkbox />} label="Cafetería" />
          <FormControlLabel checked={isChecked} onChange={handleProvidedServicesChange} componentsProps={{ typography: { variant: 'h6', fontWeight: 'bold' } }} control={<Checkbox />} label="Biblioteca" />
          <FormControlLabel checked={isChecked} onChange={handleProvidedServicesChange} componentsProps={{ typography: { variant: 'h6', fontWeight: 'bold' } }} control={<Checkbox />} label="Salón de actos" />
        </FormGroup>


        <FormControl size='large' sx={{ marginBottom: 1, marginLeft: 2, marginTop: 1, width: 400 }}>
          <InputLabel style={{ color: 'black', fontWeight: 'bolder', fontSize: 20 }} id="demo-simple-select-label">Persona que administrará el edificio</InputLabel>
          <Select
            title='Por favor, despliegue y seleccione el código de la persona que administrará el edificio que desea dar de alta'
            labelId="simple-select-buildingadminid-label"
            id="simple-select"
            value={(buildingAdminId === undefined) ? '' : buildingAdminId}
            label="Codigo administrador"
            sx={{ backgroundColor: 'white' }}
            onChange={handleSelectBuildingAdminChange}
          >
            {/* Dynamic generation of select option depending on the building administrators already registered on the database: */}
            {buildingAdmins.map(buildingAdmin => {
              return <MenuItem key={buildingAdmin.id} value={buildingAdmin.id}>Código: {buildingAdmin.id} (Nombre: {buildingAdmin.firstName} {buildingAdmin.lastName})</MenuItem>
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
            Dar de alta
          </Button>
        </CardActions>

        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleCleanCheckBox}
            size="large"
            type='reset'
            variant="contained"
            sx={{ backgroundColor: 'black' }}
          >
            Limpiar formulario
          </Button>
        </CardActions>

        {isError && <Alert severity="error">Se ha producido un error interno al intentar dar de alta el edificio {buildingName}. +Info: {errorMsg.response.data.error} ({errorMsg.response.data.text})</Alert>}
        {buildingRegistered && <Alert severity="success">Formulario cumplimentado correctamente.</Alert>}

        {confirmBuildingRegistration && <Dialog
          style={{ position: 'absolute', left: 500, top: 100 }}
          open={confirmBuildingRegistration}
          onClose={handleProceedRegistration}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirmar eliminacion edificio"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Se procederá a dar de alta un nuevo edificio con los datos que ha cumplimentado. Haga clic en «Aceptar» si desea proceder.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleProceedRegistration}>Aceptar</Button>
            <Button onClick={handleCancelRegistration}>Cancelar</Button>
          </DialogActions>
        </Dialog>}

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