import { Link } from "react-router-dom";

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#007bff",
  padding: "10px 20px",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  marginLeft: "15px",
  fontWeight: "bold",
};

export default function NavBar() {
  return (
    <nav style={navStyle}>
      <h2 style={{ color: "#fff" }}>Test Series App</h2>
      <div>
        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/register">Register</Link>
        <Link style={linkStyle} to="/login">Login</Link>
        <Link style={linkStyle} to="/test-series">Test Series</Link>
      </div>
    </nav>
  );
}
