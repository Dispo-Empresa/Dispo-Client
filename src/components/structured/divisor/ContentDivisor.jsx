import "./styles.css";

function ContentDivisor({ title }) {
  return (
    <div>
      <label className="title">{title}</label>
      <hr className="divisor" />
    </div>
  );
}

export default ContentDivisor;
