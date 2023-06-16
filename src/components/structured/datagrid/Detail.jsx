import ProductDetails from "../../../pages/products/query/details/ProductDetails";
import ProviderDetails from "../../../pages/supliers/query/details/ProviderDetails";

function Detail(props) {
  const path = window.location.pathname.replace("/registration", "");

  const modal = () => {
    switch (path) {
      case "/products":
        return (
          <ProductDetails modalType={props.modalType} productId={props.rowId} />
        );
      case "/providers":
        return (
          <ProviderDetails
            modalType={props.modalType}
            providerId={props.rowId}
          />
        );
      default:
        return null;
    }
  };

  return modal();
}

export default Detail;
