// controllers/borrow.controller.ts
import { Request, Response } from "express";
import { BorrowModel } from "./borrowBook.model";
import { BookModel } from "../Books/book.model";

const createBorrowBooks = async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;
    if (!book || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Book ID and quantity are required",
      });
    }

    const foundBook = await BookModel.findById(book);
    if (!foundBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    if (foundBook.copies < quantity) {
      return res.status(400).json({ success: false, message: "Not enough copies available" });
    }

    foundBook.copies -= quantity;
    if (foundBook.copies === 0) foundBook.available = false;
    await foundBook.save();

    const borrowDueDate = dueDate ? new Date(dueDate) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    const borrow = await BorrowModel.create({ book, quantity, dueDate: borrowDueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message || error,
    });
  }
};
/**
 * ! return Book
 */
const returnBook = async (req: Request, res: Response) => {
  try {
    const { borrowId } = req.params;

    const borrowRecord = await BorrowModel.findById(borrowId);
    if (!borrowRecord) {
      return res.status(404).json({ success: false, message: "Borrow record not found" });
    }

    const book = await BookModel.findById(borrowRecord.book);
    if (!book) {
      return res.status(404).json({ success: false, message: "Associated book not found" });
    }

    // Update book copies and availability
    book.copies += borrowRecord.quantity;
    if (book.copies > 0) book.available = true;
    await book.save();

    // Delete borrow record
    await borrowRecord.deleteOne();

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message || error,
    });
  }
};

/**
 * ! get Borrow Books
 */
const getBorrowBooks=async(req:Request, res:Response)=>{
  {
  try {
    const borrows = await BorrowModel.find().populate("book"); // book info populate
    res.status(200).json({ success: true, data: borrows });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch borrows" });
  }
};
}

export const borrowController = {
  createBorrowBooks,
  returnBook,
  getBorrowBooks
};

