import { useNavigate } from "react-router-dom";
import { useToast } from "../../Context/ToastContext";
import { useState } from "react";

import { loginHandle } from "../../FirebaseCall/loginHandle";
// import { userLogin } from "../../ApiCalls";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(false);
  let navigate = useNavigate();
  const { handleaddtoast } = useToast();
  const login = async (is_default) => {
    setIsloading(true);
    try {
      let val;
      if (is_default) {
        val = await loginHandle({
          email: "ashish@gmail.com",
          password: "ashishkumar",
          handleaddtoast,
        });
      } else {
        val = await loginHandle({ email, password, handleaddtoast });
      }

      setIsloading(false);
      if (val) {
        navigate("/");
        handleaddtoast({ message: "Welcome", type: "alert-success" });
        setPassword("");
        setEmail("");
      }
    } catch (err) {
      handleaddtoast({ message: err.message, type: "alert-dang" });
      setIsloading(false);
    }
  };
  return (
    <>
      {isloading ? (
        <div className="flex-center-row color-white fnt-2 mar-t-5">
          Logging in...
        </div>
      ) : (
        <form
          className="login-container color-white"
          onSubmit={(e) => {
            e.preventDefault();
            login(false);
          }}
        >
          <div>
            <div className="fnt-3 fnt-w-500">Pomodoro App</div>
          </div>
          <div className="fnt-1-5">Login To Pomodoro App</div>
          <input
            className="fnt-1-2"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="fnt-1-2"
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" className="fnt-1-5 ">
            Log In
          </button>
          <button
            className="secondary-btn fnt-1-5 "
            onClick={(e) => {
              e.preventDefault();
              login(true);
            }}
          >
            Login With Test Credential
          </button>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="text-xl"
          >
            Don't Have An Account ? Sign Up..
          </button>
        </form>
      )}
    </>
  );
};
