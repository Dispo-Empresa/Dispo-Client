function ContentDivisor({ title }) {
  return (
    <div>
      <label
        style={{
          fontFamily: "sans-serif",
          fontSize: "18px",
          color: "#0c9abe",
          fontWeight: "bold",
        }}
      >
        {title}
      </label>
      <hr style={{ marginTop: "10px", width: "100%", marginBottom: "auto" }} />
    </div>
  );
}

export default ContentDivisor;
