import { useEffect, useState } from 'react'
import { getAllClassrooms } from '../../../services/classroom';
import "./AddBooking.css";
import AddBookingCard from './AddBookingCard/AddBookingCard';
import { getListUsers } from '../../../services/user';

function AddBooking() {
    const [classrooms, setClassrooms] = useState([])

  useEffect(() => {
    getClassroom()
  },[])

  async function getClassroom() {
    const dataClassroom = await getAllClassrooms()
    setClassrooms(dataClassroom)
  }

  const [users, setUsers] = useState([])

  useEffect(() => {
    getUser()
  },[])

  async function getUser() {
    const dataUsers = await getListUsers()
    setUsers(dataUsers.users)
  }


  

  return (
    <div className='BodyAddMyBooking'>
      <AddBookingCard classroom={classrooms} user={users}/>
    </div>
    
  )
}

export default AddBooking