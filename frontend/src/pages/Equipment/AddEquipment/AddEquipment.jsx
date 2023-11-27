import { Alert, Box, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import './AddEquipment.css';
import { useState } from 'react';
import { createPieceEquipment } from '../../../services/equipment';
import { useNavigate } from 'react-router-dom';

function AddEquipment() {
  const [equipmentName, setEquipmentName] = useState(''),
    [equipmentNameMsg, setEquipmentNameMsg] = useState(''),
    [equipmentDescription, setEquipmentDescription] = useState(null),
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
    handleClick = async (e) => {
      e.preventDefault();

      if (equipmentName === '') {
        setEquipmentNameMsg('Error. +Info: El campo «Denominación» es de obligada cumplimentación.');
      } else {
        try {
          setEquipmentNameMsg('');
          await createPieceEquipment({ equipmentName: equipmentName, description: equipmentDescription });
          setEquipmentName('');
          setEquipmentRegistered(true);
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
        <CardHeader titleTypographyProps={{ fontWeight: 'bold', fontSize: 30, borderBottom: '1px solid black', textAlign: 'center' }} title="Alta de equipamiento"></CardHeader>
        <CardContent>

          <TextField
            className="textfield"
            onChange={handleNameChange}
            type="text"
            label="Denominación"
            margin="dense"
            title='Por favor, introduzca el nombre del equipamiento que desea dar de alta'
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
            label="Descripción"
            margin="dense"
            title='Por favor, introduzca la descripción del equipamiento que desea dar de alta'
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
            Dar de alta
          </Button>
        </CardActions>

        {isError && <Alert severity="error">Se ha producido un error interno al intentar dar de alta el equipamiento {equipmentName}. +Info: {errorMsg.response.data}</Alert>}
        {equipmentRegistered && <Alert severity="success">Formulario cumplimentado correctamente.</Alert>}

        {equipmentRegistered && <Dialog
          style={{ position: 'absolute', left: 500, top: 100 }}
          open={equipmentRegistered}
          onClose={handleNavigate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Registro de equipamiento"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Equipamiento correctamente registrado.
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

export default AddEquipment