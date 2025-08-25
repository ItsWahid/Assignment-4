import { useDeleteBookMutation, useGetBooksQuery, type IBook } from "@/services/books";
import { NavLink } from "react-router-dom";

import UpdateBookForm from "./EditBookDialog";
import BorrowDialog from "./BorrowDialog";

export default function AllBooks() {
  const { data: books, isSuccess, isError, isLoading } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">All Books Here</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2">
        {isLoading && <span>Loading...</span>}
        {isError && <span>Something went wrong</span>}
        {isSuccess &&
          books?.map((book: IBook) => (
            <div key={book._id} className="w-64 mx-auto">
              <div className="border rounded-lg shadow-md p-4 ">
                {/* Image */}
                <img
                  src={
                    book.image && book.image.trim() !== ""
                      ? book.image
                      : "https://via.placeholder.com/150x200?text=No+Image"
                  }
                  alt={book.title}
                  className="w-full h-48 object-cover rounded"
                />

                {/* Book Info */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-bold mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Author: {book.author}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Genre: {book.genre}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    ISBN: {book.isbn}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Copies: {book.copies}
                  </p>
                  <p className="text-sm text-gray-600 mb-2 truncate">
                    Description:{book.description}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Available:{" "}
                    <span
                      className={
                        book.available ? "text-green-600" : "text-red-600"
                      }
                    >
                      {book.available ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {/* Edit button handled inside UpdateBookForm */}
                  <UpdateBookForm book={book} />

                  <NavLink
                    to="add-book"
                    className="px-4 py-2 bg-green-400 text-white hover:bg-green-500 rounded"
                  >
                    Add Book
                  </NavLink>
                  {/* <BorrowDialog/> */}
                  <BorrowDialog bookId={book._id} />

                  <button
                    onClick={() => deleteBook(book._id)}
                    className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
