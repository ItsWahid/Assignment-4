import { Request, Response } from "express";
import { BookModel } from "./book.model";

export const createBook = async (req: Request, res: Response) => {
  try {
    const payload = {
      ...req.body,
      image: req.body.image || "https://via.placeholder.com/150", // ✅ default image
    };

    const data = await BookModel.create(payload);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: error.message || error,
    });
  }
};



const getBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = "title", sort = "asc", limit = "10" } = req.query;

    const query: any = {};
    if (filter) query.genre = filter;

    const books = await BookModel.find(query)
      .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
      .limit(Number(limit));

    // res.send({
    //   success: true,
    //   message: "Books fetched successfully",
    //   data: books,
    // });
    res.send(books); 
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};




const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await BookModel.findById(bookId);

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }

    res.send({
      success: true,
      message: "Single book fetched successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Error occurred",
      error: error.message,
    });
  }
};

/*const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const payload = {
      ...req.body,
      image: req.body.image || "https://via.placeholder.com/150",
    };

    const data = await BookModel.findByIdAndUpdate(bookId, payload, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }

    res.send({
      success: true,
      message: "Book updated successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Error occurred",
      error: error.message,
    });
  }
};*/

const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const payload = {
      ...req.body,
      image: req.body.image || "https://via.placeholder.com/150",
    };

    // যদি payload-এ isbn থাকে, check করুন duplicate
    if (payload.isbn) {
      const existingBook = await BookModel.findOne({ isbn: payload.isbn, _id: { $ne: bookId } });
      if (existingBook) {
        return res.status(400).send({
          success: false,
          message: "এই ISBN ইতিমধ্যেই অন্য বইয়ের জন্য ব্যবহার হয়েছে।",
        });
      }
    }

    const data = await BookModel.findByIdAndUpdate(bookId, payload, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }

    res.send({
      success: true,
      message: "Book updated successfully",
      data,
    });
  } catch (error: any) {
    // Duplicate key error handling
    if (error.code === 11000) {
      return res.status(400).send({
        success: false,
        message: "Duplicate key error: ISBN already exists",
      });
    }

    res.status(500).send({
      success: false,
      message: "Error occurred",
      error: error.message,
    });
  }
};


const DeleteBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await BookModel.findByIdAndDelete(bookId);

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }

    res.send({
      success: true,
      message: "Book deleted successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Error occurred",
      error: error.message,
    });
  }
};

export const bookController = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  DeleteBookById,
};
