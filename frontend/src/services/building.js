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
  const { data } = await api.post(
    "/building",
    buildingData,
    {
      headers: {
        authorization: localStorage.token,
      },
    }
  );
  return data;
}

export async function updateBuilding({
  buildingId, buildingData
}) {
  const { data } = await api.put(
    `/building/${buildingId}`,
    {
      buildingData
    },
    {
      headers: {
        authorization: localStorage.token,
      },
    }
  );
  return data;
}

export async function deleteBuilding(buildingId) {
  const { data } = await api.delete(`/building/${buildingId}`, {
    headers: {
      authorization: localStorage.token,
    },
  });
  return data;
}
