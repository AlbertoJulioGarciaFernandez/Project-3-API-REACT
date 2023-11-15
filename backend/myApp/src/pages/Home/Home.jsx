import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getAllUsers } from '../../services/user'


function Home() {
const navigate = useNavigate()

function onLogout(){
    localStorage.removeItem('token')
    navigate('/')
}

  return (
    <>
    <div>Home</div>
    <Button onClick={onLogout}>Logout</Button>
    {localStorage.rol==='admin' && <Button onClick={getAllUsers}>Get all users</Button>}
    </>
  )
}

export default Home