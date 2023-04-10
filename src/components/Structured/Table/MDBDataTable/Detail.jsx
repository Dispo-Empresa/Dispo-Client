import ProductDetailsCard from "../../../../pages/Products/Visualization/Details/ProductDetailsCard"
import BrandDetailsCard from "../../../../pages/Brands/Visualization/Details/BrandDetailsCard"
import ProviderDetailsCard from "../../../../pages/Providers/Visualization/Details/ProviderDetailsCard"

export default function Detail(props) {
  
  const path = window.location.pathname.replace("/visualization", "");

  const modal = () => {
    switch (path) {
      case "/products" :
        return <ProductDetailsCard modalType={props.modalType} productId={props.rowId} />;
      case "/brands" :
        return <BrandDetailsCard modalType={props.modalType} brandId={props.rowId} />
      case "/providers" :
        return <ProviderDetailsCard modalType={props.modalType} providerId={props.rowId} />
      default:
        return null;
    };
  }

  return (modal());
}