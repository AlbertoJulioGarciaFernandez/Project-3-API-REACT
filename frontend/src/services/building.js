import api from ".";

export async function getAllBuildings() {
  const { data } = await api.get("/building", {
    headers: {
      authorization: localStorage.token,
    },
  });
  return data;
}

// export async function createClassroom({ classroomName, capacity, aimedAt, buildingId }) {
//   const { data } = await api.post(
//     "/classroom",
//     {
//       classroomName: classroomName,
//       capacity: capacity,
//       aimedAt: aimedAt,
//       buildingId: buildingId
//     },
//     {
//       headers: {
//         authorization: localStorage.token,
//       },
//     }
//   );
//   return data;
// }

export async function createClassroom(classroomData) {
  const { data } = await api.post(
    "/classroom",
    classroomData,
    {
      headers: {
        authorization: localStorage.token,
      },
    }
  );
  return data;
}

export async function updateClassroom({
  classroomId, classroomData
}) {
  const { data } = await api.put(
    `/classroom/${classroomId}`,
    {
      classroomData
    },
    {
      headers: {
        authorization: localStorage.token,
      },
    }
  );
  return data;
}

export async function deleteClassroom(classroomId) {
  const { data } = await api.delete(`/classroom/${classroomId}`, {
    headers: {
      authorization: localStorage.token,
    },
  });
  return data;
}
