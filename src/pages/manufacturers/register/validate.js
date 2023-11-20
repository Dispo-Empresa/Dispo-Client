import * as Yup from "yup";

const validateManufacturers = () => {
  return Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
  });
}

export default validateManufacturers;