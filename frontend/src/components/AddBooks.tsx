import { useState } from "react";

import { useAddBooksMutation, type ICreateBook } from "@/services/books";
import { useNavigate } from "react-router";

export default function AddBooks() {
  const [book, setBook] = useState<ICreateBook>({
  
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
    image: "",
  });

  const [addBook] = useAddBooksMutation();

  const navigate=useNavigate()
  

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setBook({...book,[e.target.name]:e.target.value});
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.checked });
  };

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
   await addBook(book);
    navigate("/")
  
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="genre"
          value={book.genre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="FICTION">Fiction</option>
          <option value="NON_FICTION">Non-Fiction</option>
          <option value="SCIENCE">Science</option>
          <option value="HISTORY">History</option>
          <option value="BIOGRAPHY">Biography</option>
          <option value="FANTASY">Fantasy</option>
        </select>
        <input
          type="text"
          name="isbn"
          value={book.isbn}
          onChange={handleChange}
          placeholder="ISBN"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={book.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          rows={3}
        />
        <input
          type="number"
          name="copies"
          value={book.copies}
          onChange={handleChange}
          min={1}
          placeholder="Copies"
          className="w-full border p-2 rounded"
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            name="available"
            checked={book.available}
            onChange={handleCheckbox}
            className="mr-2"
          />
          <label>Available</label>
        </div>
        <input
          type="text"
          name="image"
          value={book.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
