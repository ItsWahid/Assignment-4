


"use client";
import { useGetBorrowsQuery, type IBorrow } from "@/services/books";



export default function BorrowSummary() {
  const { data: borrows, isLoading } = useGetBorrowsQuery();

  if (isLoading) return <p>Loading borrows...</p>;
  if (!borrows || borrows.length === 0) return <p>No borrows found!</p>;

  // Aggregate by book._id safely
  const summary = borrows.reduce(
    (
      acc: Record<
        string,
        { id: string; title: string; isbn: string; totalQuantity: number; available: boolean }
      >,
      curr: IBorrow
    ) => {
      if (!curr.book) return acc; // skip if null

      const id = curr.book._id;
      const title = curr.book.title || "Unknown Book";
      const isbn = curr.book.isbn || "N/A";
      const available = curr.book.copies > 0; // copies 0 হলে unavailable

      if (!acc[id]) {
        acc[id] = { id, title, isbn, totalQuantity: 0, available };
      }

      acc[id].totalQuantity += curr.quantity;

      // Update availability: যদি কোন borrow এ copies 0 হয়ে যায়, mark unavailable
      if (acc[id].totalQuantity >= curr.book.copies) {
        acc[id].available = false;
      }

      return acc;
    },
    {}
  );
 

  const summaryList = Object.values(summary);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Borrow Summary</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Book Title</th>
            <th className="border px-4 py-2">ISBN</th>
            <th className="border px-4 py-2">Total Quantity Borrowed</th>
            <th className="border px-4 py-2">Availability</th>
          </tr>
        </thead>
        <tbody>
          {summaryList.map((item) => (
            <tr key={item.id} className={`hover:bg-gray-50 ${!item.available ? 'bg-red-100' : ''}`}>
              <td className="border px-4 py-2">{item.title}</td>
              <td className="border px-4 py-2">{item.isbn}</td>
              <td className="border px-4 py-2">{item.totalQuantity}</td>
              <td className="border px-4 py-2">{item.available ? "Available" : "Unavailable"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



