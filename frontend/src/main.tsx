import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
// import { store } from './redux/store';
import App from "./App";
import { store } from "./features/store";
import AllBooks from "./components/AllBooks";
import AddBooks from "./components/AddBooks";
import BorrowSummary from "./components/BorrowSummary";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AllBooks/>,
      },
      {
        path: "add-book",
        element: <AddBooks />,
      },
      {
        path: "borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
