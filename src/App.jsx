import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [courses, setCourses] = useState(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses"));
    return Array.isArray(storedCourses) ? storedCourses : []; // Ensure it's always an array
  });

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");

  useEffect(() => localStorage.setItem("courses", JSON.stringify(courses)), [courses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseName || !description || !instructor) return alert("Fill all fields!");

    setCourses([...courses, { courseName, description, instructor }]);
    setCourseName(""); setDescription(""); setInstructor(""); // Clear inputs
  };

  const handleDelete = (index) => setCourses(courses.filter((_, i) => i !== index));

  return (
    <div className="container">
      <h2>AI Course Management System</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Course Name" value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Instructor" value={instructor} onChange={(e) => setInstructor(e.target.value)} required />
        <button type="submit">Add Course</button>
      </form>

      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            <strong>{course.courseName}</strong> - {course.description} by {course.instructor}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
