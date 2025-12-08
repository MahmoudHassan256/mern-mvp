import React, { useEffect, useState } from "react";
import { me } from "../api/auth";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await me();
        console.log("me response", response);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", err.response?.data || err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <p>
          Welcome,
          <br />
          {user.name}
          <br />({user.email})
        </p>
      ) : (
        <p>Loading user info...</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
