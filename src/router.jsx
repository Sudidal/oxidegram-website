import { createBrowserRouter } from "react-router-dom";
import App from "./app.jsx";
import NotFound from "./pages/notFound.jsx";
import Home from "./pages/home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export default router;
