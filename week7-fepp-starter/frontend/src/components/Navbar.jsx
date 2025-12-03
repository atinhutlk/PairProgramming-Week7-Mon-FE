import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out");
    window.location.href = "/";  
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Job Search</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/add-job">Add Job</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {user && <button onClick={handleLogout}>Log out</button>}
      </div>
    </nav>
  );
};

export default Navbar;
