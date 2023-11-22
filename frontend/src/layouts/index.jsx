import { Outlet } from 'react-router-dom'
import Header from '../components/PaginaPrincipal/Header/Header'
import SideMenu from '../components/SideMenu/SideMenu'
import { Box } from '@mui/material'

function Root() {
  return (
    <>
      <Header />
      <Box sx={{display: 'flex', flexWrap: 'wrap', backgroundColor: 'red'}}>
        <SideMenu />
        <Outlet />
      </Box>

    </>
  )
}

export default Root