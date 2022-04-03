import { createContext, useContext, useReducer } from "react";
import { UserTodoReducer } from "../Reducer/UserTodoReducer";

const UserTodoContext = createContext(null);

const useUserTodo = () => useContext(UserTodoContext);

const initial_user_todo = [];

const UserTodoProvider = ({ children }) => {
  const [user_data, setUserData] = useReducer(
    UserTodoReducer,
    initial_user_todo
  );
  return (
    <UserTodoContext.Provider value={{ user_data, setUserData }}>
      {children}
    </UserTodoContext.Provider>
  );
};

export { useUserTodo, UserTodoProvider };
