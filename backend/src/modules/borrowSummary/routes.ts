import { Router } from "express";
import { borrowController } from "./controller";
const summary=Router()

summary.get("/", borrowController.getBorrowedBooksSummary);

export default summary;