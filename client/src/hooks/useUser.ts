import { signup } from "@/api/signup.ts";
import { login } from "@/api/login.ts";
import { useAppDispatch } from "@/redux";
import { clearToken, setToken, setUsername } from "@/redux/user";
import { setPassword } from "@/redux/password.ts";

export const useUser = () => {
  const dispatch = useAppDispatch();

  const signupUser = async (
    username: string,
    password: string,
    startPassword: string,
  ): Promise<boolean> => {
    const result = signup(username, password, startPassword).then((data) => {
      if (data != false) {
        dispatch(setUsername(username));
        dispatch(setPassword(password));
        return true;
      }
      return false;
    });
    return await result;
  };

  const loginUser = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    const result = login(username, password).then((data) => {
      if (data != false) {
        dispatch(setToken(data.data.token));
        return true;
      }
      return false;
    });
    return await result;
  };

  const logoutUser = () => {
    dispatch(clearToken());
    // dispatch(clearPassword()); // TODO clear password
  };

  return { signupUser, loginUser, logoutUser };
};
