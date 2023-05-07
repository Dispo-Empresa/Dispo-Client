import ProductDetails from "../../../pages/products/views/details/ProductDetails";
import BrandDetails from "../../../pages/brands/views/details/BrandDetails";
import ProviderDetails from "../../../pages/providers/views/details/ProviderDetails";

function Detail(props) {
  const path = window.location.pathname.replace("/visualization", "");

  const modal = () => {
    switch (path) {
      case "/products":
        return (
          <ProductDetails modalType={props.modalType} productId={props.rowId} />
        );
      case "/brands":
        return (
          <BrandDetails modalType={props.modalType} brandId={props.rowId} />
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
