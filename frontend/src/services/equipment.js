import api from ".";

export async function getAllEquipment() {
  const { data } = await api.get("/equipment", {
    headers: {
      authorization: localStorage.token,
    },
  });
  return data;
}

export async function createPieceEquipment({ equipmentName, description }) {
  const { data } = await api.post(
    "/equipment",
    {
      equipmentName: equipmentName,
      description: description,
    },
    {
      headers: {
        authorization: localStorage.token,
      },
    }
  );
  return data;
}

export async function updatePieceEquipment({
  equipmentId,
  equipmentName,
  description,
}) {
  const { data } = await api.put(
    `/equipment/${equipmentId}`,
    {
      equipmentName: equipmentName,
      description: description,
    },
    {
      headers: {
        authorization: localStorage.token,
      },
    }
  );
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
