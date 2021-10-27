import "./style.css";

function RoundBtn({id, className = "", style, onClick, children, props}) {
  return (
    <button
      id={id}
      className={`round-btn ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default RoundBtn;
