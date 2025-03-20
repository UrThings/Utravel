import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Auth from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const [user, setUser] = useState(undefined);




  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
  
    if (storedUser && accessToken) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);
  
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth setUser={setUser} />} />
        <Route path="/admin/*" element={<ProtectedRoute role="admin"><AdminDashboard user={user} setUser={setUser} /></ProtectedRoute>} />
        <Route path="/user/*" element={<ProtectedRoute role="user"><UserDashboard user={user} setUser={setUser} /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
