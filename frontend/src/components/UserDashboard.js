import React, { useState, useEffect } from "react";
const UserDashboard = ({ user }) => {
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [schoolsSubscribed, setSchoolsSubscribed] = useState([]);

  useEffect(() => {
    // Feature: User management - Users can view schools 
    if (user) {
      fetch(`http://localhost/api/application/users/${user.id}/false`)
        .then((res) => res.json())
        .then((data) => {const schoolsArray = Array.isArray(data) ? data : (data.schools || []);
    setSchools(schoolsArray);})
    fetch(`http://localhost/api/application/users/${user.id}/true`)
        .then((res) => res.json())
        .then((data) => {const schoolsArray = Array.isArray(data) ? data : (data.schools || []);
    setSchoolsSubscribed(schoolsArray);})
    }
  }, [user]);
  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.status.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSubscribe = (schoolId) => {
    fetch(`http://localhost/api/application/generate/${user.id}/${schoolId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        alert("Application created successfully!");
        window.location.reload();
      })
      .catch(() => {
        alert("Error creating application");
      });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          padding: "20px",
          background: "#f0f9ff",
          border: "1px solid #bae6fd",
          borderRadius: "8px",
        }}
      >
        <h2>User Dashboard</h2>
        <div style={{
          margin: "20px 0",
          padding: "15px",
          background: "#f9fafb",
          border: "1px solid #cbd5e1",
          borderRadius: "6px",
          maxWidth: "600px"
        }}>
        </div>
        <h3>School Management</h3>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search schools..."
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
        <div
          style={{
            marginTop: "30px",
            borderTop: "2px solid #eee",
            paddingTop: "20px",
          }}
        >
          {/* Schools lists */}
          {filteredSchools.length === 0 ? (
            <p>No schools found.</p>
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
              {filteredSchools.map((s) => (
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
                      onClick={() => handleSubscribe(s.id)}
                      style={{
                        backgroundColor: "#714dff",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                    >
                      Subscribe
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>)}
        </div>
        <div>
            <h3 style={{ marginTop: "40px" }}>My Subscriptions</h3>
             {/* Schools lists */}
                {schoolsSubscribed.length === 0 ? (
                    <p>No subscriptions yet.</p> ) : (
             <table>
                <thead>
                    <tr style={{ background: "#eee" }}>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>School Name</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {schoolsSubscribed.map((s) => (
                        <tr key={s.id}>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{s.name}</td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{s.status}</td>
                        </tr>
                    ))}
                </tbody>
             </table>)}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
