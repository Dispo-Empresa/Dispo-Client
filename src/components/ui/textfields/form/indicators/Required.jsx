import { FaAsterisk } from "react-icons/fa";

function Required() {
  return (
    <i title="Campo obrigatório" style={{ color: "red", fontSize: "12px" }}>
      <FaAsterisk />
    </i>
  );
}

export default Required;
