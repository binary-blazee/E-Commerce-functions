import { Link } from "react-router-dom";
import { logout } from "../redux/loginSlice";
import { useDispatch } from "react-redux";
import logo from "../../src/assets/images/logo.png";
function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout(user));
    window.location.reload();
  };
  return (
    <div className="bg-gray-800 text-white sticky top-0 z-10">
      <header className="flex justify-between items-center mx-10">
        <div>
          <img src={logo} className="h-15" />
        </div>
        <div className="flex justify-between gap-10">
          <p>
            <Link to={"/"}>Home</Link>
          </p>
          <p>
            <Link to={"products"}>Products</Link>
          </p>
          {token === "merchant-token" && (
            <p>
              <Link to={"addProducts"}>Add Products</Link>
            </p>
          )}

          {token === "user-token" && (
            <p>
              <Link to={"cart"}>Cart</Link>
            </p>
          )}

          {token === "user-token" && (
            <p>
              <Link to={"wishlist"}>Wishlist</Link>
            </p>
          )}
        </div>
        <div>
          {!token ? (
            <Link to={"login"}>
              <button className="cursor-pointer">Login</button>
            </Link>
          ) : (
            <button className="cursor-pointer" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
