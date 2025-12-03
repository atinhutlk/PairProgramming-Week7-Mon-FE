import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return !!storedUser;
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/add-job"
              element={
                isAuthenticated ? (
                  <AddJobPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/jobs/:id"
              element={<JobPage isAuthenticated={isAuthenticated} />}
            />

            <Route
              path="/edit-job/:id"
              element={
                isAuthenticated ? (
                  <EditJobPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/signup"
              element={<Signup setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
