import "./ListUsersComponent.css";

function ListUsersComponent(props) {
console.log(props.users)

  return (
    <div className="tabla-container">
      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Dirección</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((elem) => (
            <tr key={elem.id}>
              <td>{elem.id}</td>
              <td>{elem.firstName}</td>
              <td>{elem.lastName}</td>
              <td>{elem.address}</td>
              <td>{elem.email}</td>
              <td>{elem.role}</td>
             </tr>
          ))}
        </tbody>
        </table>
    </div>
  );
}

export default ListUsersComponent;
