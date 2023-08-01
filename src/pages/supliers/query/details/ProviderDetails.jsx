import ModalView from "./FormView";
import ModalEdit from "./FormEdit";
import { modalTypeOptions } from "../../../../utils/constants/constants";

function ProviderDetails(props) {
  return props.modalType && props.modalType === modalTypeOptions.ViewModal ? (
    <ModalView providerId={props.providerId} />
  ) : (
    <ModalEdit providerId={props.providerId} />
  );
}

export default ProviderDetails;
