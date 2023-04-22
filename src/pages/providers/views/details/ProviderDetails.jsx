import ModalView from "./FormView";
import ModalEdit from "./FormEdit";
import { TypeOptions } from "../../../../data/constants/modalTypes"

function ProviderDetails(props) {

    //return props.modalType && props.modalType === TypeOptions.ViewModal ? <ModalView providerId={props.providerId} /> : <ModalEdit providerId={props.providerId} />
};

export default ProviderDetails;