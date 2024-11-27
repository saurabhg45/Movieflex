import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Popular from "./components/Popular";
import Toprated from "./components/Toprated";
import Upcoming from "./components/Upcoming";
import Search from "./components/Search";
import Details from "./components/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/popular",
        element: <Popular />,
      },
      {
        path: "/toprated",
        element: <Toprated />,
      },
      {
        path: "/upcoming",
        element: <Upcoming />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/movie",
        element: <Details />,
      },
    ],
  },
]);

export default router;
