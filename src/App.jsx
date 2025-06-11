import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import AddProducts from "./pages/AddProducts.jsx";
import Login from "./pages/Login.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Error from "./pages/Error.jsx";

const PrivateRoute = ({ children, validToken }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  if (!token || !validToken.includes(token)) {
    return <Error />;
  }
  return children;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "addProducts",
        element: (
          <PrivateRoute validToken={["merchant-token"]}>
            <AddProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "cart",
        element: (
          <PrivateRoute validToken={["user-token"]}>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <PrivateRoute validToken={["user-token"]}>
            <Wishlist />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
