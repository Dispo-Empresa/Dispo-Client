import ModalView from "./View";
import ModalEdit from "./Edit";

import { TypeOptions } from "../../../../components/Structured/Modal/ModalTypes"

export default function BrandDetailsCard(props) {

  return props.modalType && props.modalType === TypeOptions.ViewModal ? <ModalView brandId={props.brandId} /> : <ModalEdit brandId={props.brandId} />
};