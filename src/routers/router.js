import MainLayoutRoute from '../layout/main-layout'
import Contact from "../pages/Contact";
import Thanks from "../pages/Thanks";
import Statistics from "../pages/Statistics";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutRoute />,
    children: [
      {
        index: true,
        element: <Contact />
      },
      {
        path: "thanks",
        element: <Thanks />
      },
      {
        path: "statistics",
        element: <Statistics />
      },
    ]
  },
]);
