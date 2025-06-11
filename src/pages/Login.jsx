import { useState } from "react";
import LoginImage from "../assets/svg/undraw_login_weas.svg";
import { useDispatch } from "react-redux";
import { login } from "../redux/loginSlice";
import { useNavigate } from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    if (user.email && user.password) {
      dispatch(login(user));
      navigate("/");
      window.location.reload();
    }
  };
  return (
    <div className="flex justify-center gap-20">
      <div>
        <img src={LoginImage} className="h-100" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div>
          <input
            type="text"
            placeholder="Enter your email"
            className="border px-5 py-1"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter your password"
            className="border py-1 px-5"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div>
          <button
            className="border px-5 py-1 cursor-pointer rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
