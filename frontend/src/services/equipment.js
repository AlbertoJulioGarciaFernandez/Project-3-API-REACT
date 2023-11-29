import api from ".";

export async function getAllEquipment() {
  const { data } = await api.get("/equipment", {
    headers: {
      authorization: localStorage.token,
    },
  });
  return data;
}

export async function createPieceEquipment(equipmentData) {
  const { data } = await api.post("/equipment", equipmentData, {
    headers: {
      authorization: localStorage.token,
    },
  });
  return data;
}

export async function updatePieceEquipment(equipmentId, equipmentData) {
  const { data } = await api.put(`/equipment/${equipmentId}`, equipmentData, {
    headers: {
      authorization: localStorage.token,
    },
  });
  return data;
}

export async function deletePieceEquipment(equipmentId) {
  const { data } = await api.delete(`/equipment/${equipmentId}`, {
    headers: {
      authorization: localStorage.token,
    },
  });
  return data;
}
