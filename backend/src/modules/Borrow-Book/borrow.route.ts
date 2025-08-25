import { Router } from "express";
import { borrowController } from "./borrowBook.controller";

const borrowRoute = Router();

// Borrow a book
borrowRoute.post("/", borrowController.createBorrowBooks);

// Return a book
borrowRoute.post("/return/:borrowId", borrowController.returnBook);
borrowRoute.get("/",borrowController.getBorrowBooks)

export default borrowRoute;
