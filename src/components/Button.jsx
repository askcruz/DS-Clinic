import "./Button.css";

const Button = ({ children, onClick, type = "button", style = {}, className = "" }) => (
  <button
    type={type}
    className={`custom-button ${className}`}
    style={style}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;