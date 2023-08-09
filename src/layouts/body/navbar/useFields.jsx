import { useEffect, useState } from "react";

import { ENDPOINTS } from "../../../utils/constants/endpoints";
import { get } from "../../../services/httpMethods";

function useFields() {
  const [warehouses, setWarehouses] = useState([]);

  const GetWarehouses = async () => {
    const response = await get(ENDPOINTS.warehouses.getWithAdressByUser);

    setWarehouses(
      response.data.map((item) => ({
        value: item.warehouseId,
        label: item.name,
        current: item.currentWarehouse,
      }))
    );
  };

  useEffect(() => {
    GetWarehouses();
  }, []);
  return [warehouses];
}

export default useFields;
