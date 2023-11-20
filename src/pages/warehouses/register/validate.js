import * as Yup from "yup";

const validateWarehouse = () => {
  return Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    address: Yup.string().required("Campo obrigatório")
  });
}

export default validateWarehouse;