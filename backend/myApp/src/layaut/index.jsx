import { Outlet } from 'react-router-dom'

import React from 'react'

function Root() {
  return (
    <>
    <div>Header</div>
    <Outlet/>
    <div>Footer</div>
    </>
  )
}

export default Root