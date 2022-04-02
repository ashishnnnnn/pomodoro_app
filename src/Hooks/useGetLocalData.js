import { useUserTodo } from "../Context/useUserTodo";
import { useEffect } from "react";

export const useGetLocalData = () => {
  const { setUser_Data } = useUserTodo();
  useEffect(() => {
    setUser_Data({ type: "GET_TODOLIST_LOCALLY" });
  }, []);
};
