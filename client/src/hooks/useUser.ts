import { signup } from "@/api/signup.ts";
import { login } from "@/api/login.ts";
import { useAppDispatch } from "@/redux";
import { clearToken, setToken, setUsername } from "@/redux/user";
import { setPassword } from "@/redux/password.ts";

export const useUser = () => {
  const dispatch = useAppDispatch();

  const signupUser = (
    username: string,
    password: string,
    startPassword: string,
  ) => {
    signup(username, password, startPassword).then((data) => {
      if (data != false) {
        dispatch(setUsername(username));
        dispatch(setPassword(password));
      }
    });
  };

  const loginUser = (username: string, password: string) => {
    login(username, password).then(({ data }) => {
      dispatch(setToken(data.token));
    });
  };

  const logoutUser = () => {
    dispatch(clearToken());
    // dispatch(clearPassword()); // TODO clear password
  };

  return { signupUser, loginUser, logoutUser };
};
