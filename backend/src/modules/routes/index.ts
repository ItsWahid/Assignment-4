import { Router } from "express";
import bookRoute from "../Books/book.route";
import borrowRoute from "../Borrow-Book/borrow.route";
import summary from "../borrowSummary/routes";

const routes = Router();

routes.use("/books", bookRoute);
routes.use("/borrow", borrowRoute);
routes.use("/borrow-summary", summary);

export default routes;
