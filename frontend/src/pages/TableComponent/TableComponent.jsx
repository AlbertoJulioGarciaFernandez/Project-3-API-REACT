/* componente App */

import TableComponent from "../../components/TableComponent/TableComponent";

function App() {

    const apiData = [
      {
        id: 1,
        name: "Yeray",
        surname: "Reboot",
        age: 47,
        email: "yeray@gmail.com",
        rol: "user",
      },
      {
        id: 2,
        name: "Adrian",
        surname: "Reboot",
        age: 47,
        email: "adrian@gmail.com",
        rol: "user",
      },
      {
        id: 3,
        name: "Iratze",
        surname: "Reboot",
        age: 47,
        email: "iratze@gmail.com",
        rol: "admin",
      },
      {
        id: 4,
        name: "Juanan",
        surname: "Tejera",
        age: 47,
        email: "juanan@gmail.com",
        rol: "admin",
      },
      {
        id: 5,
        name: "Diana",
        surname: "Reboot",
        age: 47,
        email: "diana@gmail.com",
        rol: "user",
      },
      {
        id: 6,
        name: "Iratze",
        surname: "Reboot",
        age: 47,
        email: "iratze@gmail.com",
        rol: "admin",
      },
      {
        id: 7,
        name: "Juanan",
        surname: "Tejera",
        age: 47,
        email: "juanan@gmail.com",
        rol: "admin",
      },
      {
        id: 8,
        name: "Diana",
        surname: "Reboot",
        age: 47,
        email: "diana@gmail.com",
        rol: "user",
      },
      {
        id: 9,
        name: "Yeray",
        surname: "Reboot",
        age: 47,
        email: "yeray@gmail.com",
        rol: "user",
      },
      {
        id: 10,
        name: "Adrian",
        surname: "Reboot",
        age: 47,
        email: "adrian@gmail.com",
        rol: "user",
      },
      {
        id: 11,
        name: "Iratze",
        surname: "Reboot",
        age: 47,
        email: "iratze@gmail.com",
        rol: "admin",
      },
      {
        id: 12,
        name: "Juanan",
        surname: "Tejera",
        age: 47,
        email: "juanan@gmail.com",
        rol: "admin",
      },
      {
        id: 13,
        name: "Diana",
        surname: "Reboot",
        age: 47,
        email: "diana@gmail.com",
        rol: "user",
      },
      {
        id: 14,
        name: "Iratze",
        surname: "Reboot",
        age: 47,
        email: "iratze@gmail.com",
        rol: "admin",
      },
      {
        id: 15,
        name: "Juanan",
        surname: "Tejera",
        age: 47,
        email: "juanan@gmail.com",
        rol: "admin",
      },
      {
        id: 16,
        name: "Diana",
        surname: "Reboot",
        age: 47,
        email: "diana@gmail.com",
        rol: "user",
      },
    ];


  return (
    <TableComponent data = {apiData}/>
  )
}

export default App