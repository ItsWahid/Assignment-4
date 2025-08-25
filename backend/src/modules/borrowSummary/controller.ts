import { Request, Response } from "express";
import { BorrowModel } from "../Borrow-Book/borrowBook.model";

const getBorrowedBooksSummary = async (req: Request, res: Response) => {
  try {
    const summary = await BorrowModel.aggregate([
      {
        $group: {
          _id: "$book", // Group by book ObjectId
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books", // Make sure this matches your Book collection name
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export const borrowController = {
  getBorrowedBooksSummary,
};
