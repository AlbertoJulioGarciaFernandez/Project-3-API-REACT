import React from 'react'
import { Outlet } from 'react-router-dom'

function Root() {
  return (
    <>
    <div>I am the Header</div>
    <Outlet/>
    <div>I am the Footer</div>
    </>
  )
}

export default Root