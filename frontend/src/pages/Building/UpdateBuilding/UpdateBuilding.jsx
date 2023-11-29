import { Alert, Box, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, TextField, InputLabel, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import './UpdateBuilding.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBuildings, updateBuilding } from '../../../services/building';
import { getListUsers } from '../../../services/user';

function UpdateBuilding() {

  useEffect(() => {
    getExistingUsers();
    getExistingBuildings();
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

  async function getExistingBuildings() {
    // API request:
    const { buildings } = await getAllBuildings();

    // Storing all the buildings:
    setBuildings(buildings);
  }

  const [buildings, setBuildings] = useState([]),
    [buildingName, setBuildingName] = useState(''),
    [buildingNameMsg, setBuildingNameMsg] = useState(''),
    [buildingId, setBuildingId] = useState(''),
    [buildingIdMsg, setBuildingIdMsg] = useState(''),
    [buildingAddress, setBuildingAddress] = useState(''),
    [buildingPhoneNumb, setBuildingPhoneNumb] = useState(''),
    [buildingProvidedServices, setBuildingProvidedServices] = useState([]),
    [buildingAdmins, setBuildingAdmins] = useState([]),
    [buildingAdminId, setBuildingAdminId] = useState(null),
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
        // We include in the array as many services as checkboxes are checked as long
        // as these services are NOT already stored in the array:
        if (!buildingProvidedServices.includes(e.target.labels[0].innerText)) {
          setBuildingProvidedServices([...buildingProvidedServices, e.target.labels[0].innerText]);
        }
      }

      // if (!e.target.checked) {
      //   console.log(e.target.labels[0].innerText + ' no seleccionado')
      //   // We delete from the array as many services as checkboxes are unchecked:
      //   if (buildingProvidedServices.includes(e.target.labels[0].innerText)) {
      //     console.log(e.target.labels[0].innerText + ' incluído')
      //     // console.log('array incluye ' + e.target.labels[0].innerText)
      //     const result = buildingProvidedServices.filter(providedService => providedService !== e.target.labels[0].innerText);
      //     console.log(result)
      //     result.map(service => {
      //       if (!buildingProvidedServices.includes(service)) {
      //         setBuildingProvidedServices([...buildingProvidedServices, service]);
      //       }
      //     });
      //   }
      // }
      // console.log(buildingProvidedServices)
      if (!e.target.checked) {
        // We delete from the array as many services as checkboxes are unchecked:
        if (buildingProvidedServices.includes(e.target.labels[0].innerText)) {
          const result = buildingProvidedServices.filter(providedService => providedService !== e.target.labels[0].innerText);
          setBuildingProvidedServices(result)
        }
      }
    },
    handleSelectBuildingIdChange = (e) => {
      setBuildingId(e.target.value);
    },
    handleSelectBuildingAdminChange = (e) => {
      setBuildingAdminId(e.target.value);
    },
    handleClick = async (e) => {
      e.preventDefault();

      if (buildingId === '') {
        setBuildingIdMsg('Error. +Info: Por favor, despliegue el menú «Código del edificio» y seleccione un valor.');
      } else {
        setBuildingIdMsg('');
        if (buildingName === '') {
          setBuildingNameMsg('Error. +Info: El campo «Denominación» es de obligada cumplimentación.');
        } else {
          try {
            setBuildingNameMsg('');
            let buildingServices = buildingProvidedServices.join(', ');
            await updateBuilding(buildingId, { buildingName: buildingName, address: buildingAddress, phoneNumber: buildingPhoneNumb, providedServices: buildingServices, userId: buildingAdminId });
            //         "buildingName": "nuevo",
            // "address": "C/ Lope de Vega, 19",
            // "phoneNumber": "785623659",
            // "providedServices": "Biblioteca, Salón de actos",
            // "userId": 8
            setBuildingName('');
            setBuildingRegistered(true);
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
        sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'space-evenly', backgroundColor: '#c3d2fc', height: '90vh', width: '50vw' }}
      >
        <CardHeader titleTypographyProps={{ fontWeight: 'bold', fontSize: 30, borderBottom: '1px solid black', textAlign: 'center' }} title="Actualización de edificio"></CardHeader>

        <FormControl size='large' sx={{ marginLeft: 2, marginBottom: -1, width: 300 }}>
          <InputLabel required style={{ color: 'black', fontWeight: 'bolder', fontSize: 20 }} id="demo-simple-select-label">Código del edificio</InputLabel>
          <Select
            title='Por favor, despliegue y seleccione el código del edificio que desea actualizar'
            labelId="simple-select-building-id-label"
            id="simple-select"
            value={buildingId}
            label="Código edificio"
            sx={{ backgroundColor: 'white' }}
            onChange={handleSelectBuildingIdChange}
          >
            {/* Dynamic generation of select option depending on the buildings already registered on 
            the database: */}
            {buildings.map(building => {
              return <MenuItem key={building.id} value={building.id}>Código {building.id} (Denominación: {building.buildingName})</MenuItem>
            })}
          </Select>
          {buildingIdMsg.includes('Error') && <Alert severity="error">{buildingIdMsg}</Alert>}
        </FormControl>

        <CardContent>
          <TextField
            className="textfield"
            onChange={handleNameChange}
            type="text"
            title='Por favor, introduzca la nueva denominación del edificio'
            label="Denominacion"
            margin="dense"
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
            title='Por favor, introduzca la nueva dirección del edificio'
            label="Direccion"
            margin="dense"
            fullWidth={true}
            InputLabelProps={{ style: { color: 'black', fontWeight: 'bolder', fontSize: 20 } }}
            variant="filled"
          ></TextField>

          <TextField
            className="textfield"
            onChange={handlePhoneNumbChange}
            type="text"
            title='Por favor, introduzca el nuevo número de teléfono del edificio'
            label="Telefono"
            margin="dense"
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


        <FormControl size='large' sx={{ marginBottom: 1, marginLeft: 2, marginTop: 1, width: 400 }}>
          <InputLabel style={{ color: 'black', fontWeight: 'bolder', fontSize: 20 }} id="demo-simple-select-label">Persona que administrará el edificio</InputLabel>
          <Select
            title='Por favor, despliegue y seleccione el nuevo código de la persona que administrará el edificio que desea actualizar'
            labelId="simple-select-buildingadminid-label"
            id="simple-select"
            value={(buildingAdminId === null) ? '' : buildingAdminId}
            label="Codigo administrador"
            sx={{ backgroundColor: 'white' }}
            onChange={handleSelectBuildingAdminChange}
          >
            {/* Dynamic generation of select option depending on the building administrators already registered on the database: */}
            {buildingAdmins.map(buildingAdmin => {
              return <MenuItem key={buildingAdmin.id} value={buildingAdmin.id}>Código {buildingAdmin.id} (Nombre: {buildingAdmin.firstName} {buildingAdmin.lastName})</MenuItem>
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

        {isError && <Alert severity="error">Se ha producido un error interno al intentar actualizar el edificio con código {buildingId}. +Info: {errorMsg.response.data.error} ({errorMsg.response.data.text})</Alert>}
        {buildingRegistered && <Alert severity="success">Formulario cumplimentado correctamente.</Alert>}

        {buildingRegistered && <Dialog
          style={{ position: 'absolute', left: 500, top: 100 }}
          open={buildingRegistered}
          onClose={handleNavigate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Actualización de edificio"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              El edificio con código {buildingId} se ha actualizado correctamente en la base de datos.
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

export default UpdateBuilding