import ModalView from "./View";
import ModalEdit from "./Edit";

import { TypeOptions } from "../../../../components/Structured/Modal/ModalTypes"

export default function ProviderDetailsCard(props) {

  return props.modalType && props.modalType === TypeOptions.ViewModal ? <ModalView providerId={props.providerId} /> : <ModalEdit providerId={props.providerId} />
};