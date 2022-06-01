import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

export const signupHandle = async ({ email, password, handleaddtoast }) => {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (!reg.test(email)) {
    handleaddtoast({
      message: "Enter Valid Email",
      type: "alert-dang",
    });
    return;
  }
  if (password.length < 6) {
    handleaddtoast({
      message: "Password Length Should be greater than 5",
      type: "alert-dang",
    });
    return;
  }
  let response = await createUserWithEmailAndPassword(auth, email, password);
  localStorage.setItem("pomodoro-email", response.user.email);
  localStorage.setItem("pomodoro-token", response.user.uid);
  return "All Good";
};
