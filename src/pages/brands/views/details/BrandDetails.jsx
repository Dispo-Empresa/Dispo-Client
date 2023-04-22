import ModalView from "./FormView";
import ModalEdit from "./FormEdit";
import { TypeOptions } from "../../../../data/constants/modalTypes"

function BrandDetails(props) {

  //return props.modalType && props.modalType === TypeOptions.ViewModal ? <ModalView brandId={props.brandId} /> : <ModalEdit brandId={props.brandId} />
};

export default BrandDetails;