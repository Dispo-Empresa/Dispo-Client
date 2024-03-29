import * as Yup from "yup";

const validateSupplier = () => {
  return Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    contactName: Yup.string().required("Campo obrigatório"),
    contactTitle: Yup.string().required("Campo obrigatório"),
    cnpj: Yup.string().required("Campo obrigatório"),
    email: Yup.string().required("Campo obrigatório"),
    phone: Yup.string().required("Campo obrigatório"),
  });
}

export default validateSupplier;