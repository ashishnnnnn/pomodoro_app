import { useNavigate } from "react-router-dom";
import { useToast } from "../../Context/ToastContext";

import { signupHandle } from "../../FirebaseCall/signupHandle";
import { useState } from "react";
import "./Signup.css";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(false);
  let navigate = useNavigate();

  const { handleaddtoast } = useToast();
  const signup = async () => {
    setIsloading(true);
    try {
      let val = await signupHandle({ email, password, handleaddtoast });
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
          Signing in...
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signup();
          }}
          className="signup-container color-white"
        >
          <div>
            <div className="fnt-3 fnt-w-500">Pomodoro App</div>
          </div>
          <div className="fnt-1-5">Signup To Pomodoro App</div>

          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="fnt-1-2"
            placeholder="Email"
            value={email}
          />

          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="fnt-1-2"
            placeholder="Password"
            value={password}
            type="password"
          />

          <button type="submit" className="fnt-1-5 ">
            Signup
          </button>

          <button
            onClick={() => {
              navigate("/login");
            }}
            className="secondary-btn fnt-1-5 "
          >
            Already Have An Account..
          </button>
        </form>
      )}
    </>
  );
};
