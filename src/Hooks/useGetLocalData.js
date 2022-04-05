import { useUserTodo } from "../Context/useUserTodo";
import { useEffect } from "react";

export const useGetLocalData = () => {
  const { setUserData } = useUserTodo();
  useEffect(() => {
    setUserData({ type: "GET_TODOLIST_LOCALLY" });
  }, []);
};
