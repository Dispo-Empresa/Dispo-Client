import * as Yup from "yup";

const validateEmployee = () => {
  return Yup.object().shape({
    email: Yup.string().required("Campo obrigatório").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email inválido"),
    warehouses: Yup.number().required("Campo obrigatório"),
    role: Yup.object().required("Campo obrigatório"),
  });
}

export default validateEmployee;