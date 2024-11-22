import { createBrowserRouter } from "react-router-dom";
import App from "./app.jsx";
import NotFound from "./pages/notFound/notFound.jsx";
import Home from "./pages/home.jsx";
import Signup from "./components/signup/signup.jsx";
import Login from "./components/login/login.jsx";
import Accounts from "./pages/accounts/accounts.jsx";

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
        path: "/accounts",
        element: <Accounts />,
        children: [
          {
            path: "",
            element: <Login />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },
    ],
  },
]);

export default router;
