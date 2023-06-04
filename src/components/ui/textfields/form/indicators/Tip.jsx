import { FaRegQuestionCircle } from "react-icons/fa";

function Tip(props) {
  return (
    <i
      title={props.message}
      style={{ color: "#0C9ABE", fontSize: "14px", marginLeft: "10px" }}
    >
      <FaRegQuestionCircle />
    </i>
  );
}

export default Tip;
