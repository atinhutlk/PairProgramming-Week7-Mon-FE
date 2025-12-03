import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    alert("Logged out");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Job Search</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>

        {isAuthenticated && <Link to="/add-job">Add Job</Link>}

        {!isAuthenticated && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {isAuthenticated && (
          <button className="logout-link" onClick={handleLogout}>
            Log out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
