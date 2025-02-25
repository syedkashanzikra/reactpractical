import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    return Array.isArray(storedBooks) ? storedBooks : []; // Ensure it's always an array
  });
  
  const [bookName, setBookName] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => localStorage.setItem("books", JSON.stringify(books)), [books]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookName || !description || !author) return alert("Fill all fields!");

    setBooks([...books, { bookName, description, author }]);
    setBookName(""); setDescription(""); setAuthor(""); // Clear inputs
  };

  const handleDelete = (index) => setBooks(books.filter((_, i) => i !== index));

  return (
    <div className="container">
      <h2>Book Management System</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Book Name" value={bookName} onChange={(e) => setBookName(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <button type="submit">Add Book</button>
      </form>

      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <strong>{book.bookName}</strong> - {book.description} by {book.author}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
