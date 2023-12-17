import HomeIcon from "@mui/icons-material/Home";
import { BreadCrumb } from "primereact/breadcrumb";
import { useLocation } from "react-router-dom";

const withLocation = (Component) => (props) => {
  const location = useLocation();

  return <Component {...props} location={location} />;
};

const Navigator = ({ location }) => {
  const items = location.pathname.split("/").filter((item) => item !== "");

  const dashboard = {
    icon: <HomeIcon style={{ color: "#029DBE" }} />,
    url: "/dashboard",
  };
  const menuItems = items.map((item, index) => ({
    label: (item.charAt(0).toUpperCase() + item.slice(1)).replace(/-/g, " "),
    url: `/${items.slice(0, index + 1).join("/")}`,
  }));

  const breadcrumbs = [...menuItems];

  return (
    <BreadCrumb
      model={breadcrumbs}
      home={dashboard}
      style={{
        borderRadius: "10px",
        marginBottom: "5px",
        fontSize: "15px",
        padding: "8px 8px",
      }}
    />
  );
};

export default withLocation(Navigator);
