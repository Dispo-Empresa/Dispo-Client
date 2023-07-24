import ModalView from "./FormView";
import ModalEdit from "./FormEdit";
import { modalTypeOptions } from "../../../../utils/constants/constants";

function ProductDetails(props) {
  return props.modalType && props.modalType === modalTypeOptions.ViewModal ? (
    <ModalView productId={props.productId} />
  ) : (
    <ModalEdit productId={props.productId} />
  );
}

export default ProductDetails;
