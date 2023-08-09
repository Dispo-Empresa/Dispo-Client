import { useState } from "react";

// import validate from "./validations";
import { get } from "../../../services/httpMethods";
import { ENDPOINTS } from "../../../utils/constants/endpoints";
import { useEffect } from "react";

const initialState = {
  name: "",
  address: "",
};

function useFields() {
  const [addresses, setAddresses] = useState([]);
    const GetAddresses = async () => {
    const response = await get(ENDPOINTS.addresses.getFormattedAddresses);
    console.log(response);
    setAddresses(
      response.data.map((item) => ({ value: item.addressId, label: item.address }))
    );
  };
  useEffect(GetAddresses, [setAddresses]);

  return [
    addresses,
  ];
}

export default useFields;
