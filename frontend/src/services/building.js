import api from ".";

export async function getAllBuildings() {
  const { data } = await api.get("/building", {
    headers: {
      authorization: localStorage.token,
    },
  });
  return data;
}

export async function createBuilding(buildingData) {
  const { data } = await api.post("/building", buildingData, {
    headers: {
      authorization: localStorage.token,
    },
  });
  console.log(data)
  return data;
}

export async function updateBuilding(buildingId, buildingData) {
  console.log(buildingData)
  try {
    const { data } = await api.put(`/building/${buildingId}`, buildingData, {
      headers: {
        authorization: localStorage.token,
      },
    });
    return data;   
  } catch (error) {
    console.log(error)
  }
 
}

// await updateBuilding(buildingId, { buildingName: buildingName, address: buildingAddress, phoneNumber: buildingPhoneNumb, providedServices: buildingServices, userId: buildingAdminId });

export async function deleteBuilding(buildingId) {
  const { data } = await api.delete(`/building/${buildingId}`, {
    headers: {
      authorization: localStorage.token,
    },
  });
  return data;
}
