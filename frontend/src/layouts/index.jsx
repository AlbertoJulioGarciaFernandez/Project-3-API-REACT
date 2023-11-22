import { Outlet } from 'react-router-dom'
import Header from '../components/PaginaPrincipal/Header/Header'
import SideMenu from '../components/SideMenu/SideMenu'

function Root() {
  return (
    <>
      <Header />
      <SideMenu />
      <Outlet />
    </>
  )
}

export default Root