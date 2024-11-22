import { createBrowserRouter } from "react-router-dom";
import App from "./app.jsx";
import NotFound from "./pages/notFound/notFound.jsx";
import Home from "./pages/home.jsx";
import Signup from "./pages/signup/signup.jsx";
import Login from "./pages/login/login.jsx";
import Phone from "./components/phone/phone.jsx";

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
      {
        path: "/phone",
        element: <Phone />,
      },
    ],
  },
]);

export default router;
