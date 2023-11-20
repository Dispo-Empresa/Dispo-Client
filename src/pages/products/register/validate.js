import * as Yup from "yup";

const validateProducts = () => {
  return Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    salePrice: Yup.string().required("Campo obrigatório"),
    category: Yup.string().required("Campo obrigatório"),
    unitOfMeasurement: Yup.string().required("Campo obrigatório"),
    description: Yup.string().required("Campo obrigatório"),
  });
}

export default validateProducts;