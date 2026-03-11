import React, { useState, useEffect } from "react";
const AdminDashboard = ({ user }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [schools, setSchools] = useState([]);
  const [newSchool, setNewSchool] = useState({
    name: "",
    status: "Public",
    maxPlace: 0,
  });

  useEffect(() => {
    // Feature: User management - Admin can view users [cite: 50]
    if (user) {
      fetch("http://localhost:3000/api/schools", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setSchools(data));
      fetch("http://localhost:3000/api/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setAllUsers(data))
        .catch((err) => console.error("Error fetching users:", err));
    }
  }, [user]);

  // Feature: Search keyword search [cite: 58]
  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            // Mise à jour de l'affichage local après suppression
            setAllUsers(allUsers.filter((u) => u.id !== userId));
          } else {
            alert("Failed to delete user");
          }
        })
        .catch((err) => console.error("Error:", err));
    }
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setAllUsers([...allUsers, data]);
        setNewUser({ name: "", email: "", password: "", role: "USER" });
      })
      .catch((err) => console.error("Error:", err));
  };

  const handleDeleteSchool = (schoolId) => {
    if (window.confirm("Are you sure you want to delete this school?")) {
      fetch(`http://localhost:3000/api/schools/${schoolId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            setSchools(schools.filter((s) => s.id !== schoolId));
          } else {
            alert("Failed to delete school");
          }
        })
        .catch((err) => console.error("Error:", err));
    }
  };
  const handleCreateSchool = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/schools/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newSchool),
    })
      .then((res) => res.json())
      .then((data) => {
        setSchools([...schools, data]);
        setNewSchool({ name: "", status: "Public", maxPlace: 0 });
      });
  };

  const [bioSearchTerm, setBioSearchTerm] = useState("");
  const [bioSearchResults, setBioSearchResults] = useState([]);


  return (
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          padding: "20px",
          background: "#fff5f5",
          border: "1px solid #feb2b2",
          borderRadius: "8px",
        }}
      >
        <h2>Admin Dashboard</h2>
        <h3>User Management</h3>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
          }}
        >
          <thead>
            <tr style={{ background: "#eee" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Name
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Email
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Role
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Bio</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {u.name}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {u.email}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {u.role}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    maxWidth: "250px",
                    whiteSpace: "pre-line",
                    color: u.bio ? "#222" : "#888",
                  }}
                >
                  {u.bio ? u.bio : <em>No bio</em>}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {u.role !== "ADMIN" ? (
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      style={{
                        backgroundColor: "#ff4d4d",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                    >
                      Delete
                    </button>
                  ) : (
                    <span style={{ color: "#999" }}>No delete</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={handleCreateUser} style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button type="submit">Add User</button>
        </form>
        <div
          style={{
            marginTop: "30px",
            borderTop: "2px solid #eee",
            paddingTop: "20px",
          }}
        >
          <h3>School Management</h3>

          {/* Form to add a new school */}
          <form onSubmit={handleCreateSchool} style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="School Name"
              value={newSchool.name}
              onChange={(e) =>
                setNewSchool({ ...newSchool, name: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Max Places"
              value={newSchool.maxPlace}
              onChange={(e) =>
                setNewSchool({ ...newSchool, maxPlace: e.target.value })
              }
              required
            />
            <select
              value={newSchool.status}
              onChange={(e) =>
                setNewSchool({ ...newSchool, status: e.target.value })
              }
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
            <button type="submit">Add School</button>
          </form>

          {/* Schools lists */}
          {schools.length === 0 ? (
            <p>No schools published.</p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "white",
              }}
            >
              <thead>
                <tr style={{ background: "#eee" }}>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Name
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Status
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Max Places
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {schools.map((s) => (
                  <tr key={s.id}>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {s.name}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {s.status}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {s.maxPlace}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <button
                        onClick={() => handleDeleteSchool(s.id)}
                        style={{
                          backgroundColor: "#ff4d4d",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          cursor: "pointer",
                          borderRadius: "4px",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
