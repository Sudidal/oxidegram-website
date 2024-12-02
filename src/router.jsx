import { createBrowserRouter } from "react-router-dom";
import App from "./app.jsx";
import NotFound from "./pages/notFound/notFound.jsx";
import Home from "./pages/home/home.jsx";
import Signup from "./components/signup/signup.jsx";
import Login from "./components/login/login.jsx";
import Accounts from "./pages/accounts/accounts.jsx";
import Profile from "./pages/profile/profile.jsx";
import Messages from "./pages/messages/messages.jsx";

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
        path: "/profiles/:profileId/:tab?",
        element: <Profile />,
      },
      {
        path: "/messages",
        element: <Messages />,
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
