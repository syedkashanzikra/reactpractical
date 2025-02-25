import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [schools, setSchools] = useState(() => {
    const storedSchools = JSON.parse(localStorage.getItem("schools"));
    return Array.isArray(storedSchools) ? storedSchools : [];
  });

  const [schoolName, setSchoolName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => localStorage.setItem("schools", JSON.stringify(schools)), [schools]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!schoolName || !description) return alert("Fill all fields!");

    setSchools([...schools, { schoolName, description }]);
    setSchoolName(""); setDescription(""); // Clear inputs
  };

  const handleDelete = (index) => setSchools(schools.filter((_, i) => i !== index));

  return (
    <div className="container">
      <h2>School Management System</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="School Name" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">Add School</button>
      </form>

      <ul>
        {schools.map((school, index) => (
          <li key={index}>
            <strong>{school.schoolName}</strong> - {school.description}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
