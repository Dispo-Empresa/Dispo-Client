import ModalView from "./View";
import ModalEdit from "./Edit";

import { TypeOptions } from "../../../../components/Structured/Modal/ModalTypes"

export default function ProductDetailsCard(props) {

  return props.modalType && props.modalType === TypeOptions.ViewModal ? <ModalView productId={props.productId} /> : <ModalEdit productId={props.productId} />
};