



"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBorrowBookMutation, useGetBooksQuery } from "@/services/books";
import { useNavigate } from "react-router";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { IBorrow } from "@/services/books";

interface BorrowDialogProps {
  bookId: string;
}

export default function BorrowDialog({ bookId }: BorrowDialogProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Fetch all books
  const { data: books } = useGetBooksQuery();
  const book = books?.find((b) => b._id === bookId);

  // Borrow state
  const [borrow, setBorrow] = useState<IBorrow>({
    // book: bookId, 
    book:null,
    quantity: 1,
    dueDate: "",
  });

  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBorrow({
      ...borrow,
      [name]: name === "quantity" ? Number(value) : value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Borrow payload:", borrow);

    if (!borrow.book || !borrow.quantity) {
      alert("Book ID and quantity are required!");
      return;
    }

    try {
      const result = await borrowBook(borrow).unwrap();
      console.log("Borrow API result:", result);

      setOpen(false); // close dialog

      navigate("/borrow-summary", {
        state: { borrow, book, result },
        
      });
 

    } catch (error: unknown) {
      let message = "Check console";
      if (typeof error === "object" && error !== null) {
        const e = error as FetchBaseQueryError;
        if (typeof e.data === "object" && e.data !== null && "message" in e.data) {
          message = (e.data as { message: string }).message;
        } else if (typeof e.data === "string") {
          message = e.data;
        }
      }
      console.error("Borrow failed:", error);
      alert(`Borrow failed! ${message}`);
    }
  };

  if (!book) return <p>Book not found</p>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Borrow Book
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
          </DialogHeader>

          {/* Book Info */}
          <div className="mb-4 p-3 border rounded-md bg-gray-50">
            <h2 className="font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <p className="text-sm text-gray-600">
              Available Copies: {book.copies ?? "N/A"}
            </p>
          </div>

          <div className="grid gap-4">
            {/* Quantity */}
            <div className="grid gap-3">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                value={borrow.quantity}
                onChange={handleChange}
              />
            </div>

            {/* Due Date */}
            <div className="grid gap-3">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={borrow.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Borrowing..." : "Confirm Borrow"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}





