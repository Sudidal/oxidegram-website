import { createBrowserRouter } from "react-router-dom";
import App from "./app.jsx";
import NotFound from "./pages/notFound.jsx";
import Home from "./pages/home.jsx";
import Signup from "./pages/signup/signup.jsx";

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
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
