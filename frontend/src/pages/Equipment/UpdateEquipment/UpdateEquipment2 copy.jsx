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
    const data = await getAllEquipment(),
      // Storing into «result» all the id codes belonging to the pieces of equipment 
      // we have already retrieved from the database:
      result = data.map((item) => item.id);

    // With the spread operator, we will make up an array according to our needs (in
    // this case, it will contain the string 'Despliegue para seleccionar' as well as
    // the content of «result», which is another array containing the id codes retrieved
    // previously).
    // setSelectArr([...selectArr, result.map(id => console.log(id))]);
    result.map(id => selectArr.push(id))
    setEquipmentId(result[0]);
    setSelectEquipmentId(equipmentId)
    // Storing the different pieces of equipment:
    setEquipment(data);
  }

  const [equipment, setEquipment] = useState([]),
    [equipmentId, setEquipmentId] = useState(),
    [selectArr, setSelectArr] = useState(['Despliegue para seleccionar']),
    [selectEquipmentId, setSelectEquipmentId] = useState(),
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
      setSelectEquipmentId(e.target.value.toString());
    },
    handleClick = async (e) => {
      e.preventDefault();

      if (equipmentId === 'Despliegue para seleccionar') {
        setEquipmentIdMsg('Error. +Info: Por favor, despliegue el menú «Código del equipamiento» y seleccione un valor.');
      } else {
        setSelectEquipmentId(equipmentId);
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
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        raised={true}
        // component={'form'}
        sx={{  height: '50vh', width: '50vw' }}
      >
        <CardHeader title="Actualización de equipamiento" sx={{ color: 'white', textAlign: 'center' }}></CardHeader>
        <CardContent>
          <InputLabel style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bolder', fontSize: 20, width: 250 }} id="simple-select-equipment-id-label">Código del equipamiento</InputLabel>
          <Select
            title='Por favor, seleccione el código del equipamiento que desea actualizar'
            labelId="simple-select-equipment-id-label"
            id="simple-select"
            value={selectEquipmentId}
            label="Código equipamiento"
            sx={{ backgroundColor: 'white' }}
            onChange={handleSelectChange}
          >
            {/* Dynamic generation of select option depending on the equipment already registered on 
            the database: */}
            {/*  {equipment.map(pieceOfEquipment => {
              selectArr.push(pieceOfEquipment.id.toString());
            })}
            {selectArr.unshift('Despliegue para seleccionar')}
            {console.log(selectArr)} */}

            {selectArr.map((opt, i) => {
              return <MenuItem key={i} value={opt}>{opt}</MenuItem>
            })}
          </Select>

          {equipmentIdMsg.includes('Error') && <Alert severity="error">{equipmentIdMsg}</Alert>}

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={equipment}
              label="Age"
              onChange={handleSelectChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>


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
          style={{ position: 'absolute', left: 500, top: 200 }}
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
  )
}

export default UpdateEquipment