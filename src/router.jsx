import { createBrowserRouter } from "react-router-dom";
import App from "./app.jsx";
import NotFound from "./pages/notFound.jsx";
import Home from "./pages/home.jsx";
import Signup from "./pages/signup/signup.jsx";
import Login from "./pages/login/login.jsx";

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
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
