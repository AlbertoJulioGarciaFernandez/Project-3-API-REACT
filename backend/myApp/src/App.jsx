import { useState } from 'react'
import './App.css'
import {Box, Typography, Button, TextField} from '@mui/material'
import {login} from './services/auth'
import { getAllUsers } from './services/user'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  function handleChangeEmail(e){
    setEmail(e.target.value)
  }

  async function handleLogin(){
    const response = await login({email, password})
    console.log(response)
    localStorage.setItem('token', response.token)
    //Incluimos el rol
    localStorage.setItem('rol',response.rol)
    navigate('/home')
  }

  async function handleGetAllUsers(){
    const response = await getAllUsers()
    console.log(response)
  }

  return (
    <>
    <h1>Hola (-(-_(-_-)_-)-)</h1>
    <Typography variant='h1'>¯¯̿̿¯̿̿'̿̿̿̿̿̿̿'̿̿'̿̿̿̿̿'̿̿̿)͇̿̿)̿̿̿̿ '̿̿̿̿̿̿\̵͇̿̿\=(•̪̀●́)=o/̵͇̿̿/'̿̿ ̿ ̿̿</Typography>
    <Typography variant='h1'>Me salió </Typography>
    <Box>
      <TextField onChange={(e)=>handleChangeEmail(e)} fullWidth={true} variant='outlined' label='Email'></TextField>
      <TextField onChange={(e) => setPassword(e.target.value)} type='password' fullWidth={true} variant='outlined' label='Password'></TextField>
    </Box>
    <Button onClick={handleLogin} sx={{margin: '20px'}} variant='contained'>Login</Button>
    <Button onClick={handleGetAllUsers} variant='contained'>All users</Button>
    <Typography variant="h6">
        {email} - {password}
      </Typography>
    </>
  )
}

export default App
