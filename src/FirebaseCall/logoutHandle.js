import { signOut } from "firebase/auth";
import { auth } from "../Firebase";

export const logoutHandle = async () => {
  await signOut(auth);
  localStorage.removeItem("pomodoro-email");
  localStorage.removeItem("pomodoro-token");
  console.log("Chala");
  return "All Good";
};
