import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "@/redux";
import { Button } from "@/components/ui/button.tsx";
import { useUser } from "@/hooks/useUser.ts";

export const StartPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { signupUser, loginUser, logoutUser } = useUser();
  const { username, token } = useAppSelector((state) => state.user);
  const password = useAppSelector((state) => state.password.password);
  const isLocal = import.meta.env.VITE_IS_LOCAL || 3000;

  return (
    <div className="min-h-screen max-h-screen w-full overflow-y-auto overflow-x-hidden">
      {!username && (
        <Button
          onClick={() =>
            signupUser("User", "soSecret", "very_secret_start_password")
          }
        >
          {t("user.signup")}
        </Button>
      )}
      {username && !token && (
        <Button onClick={() => loginUser(username, password || "")}>
          {t("user.login")}
        </Button>
      )}
      {token && (
        <Button onClick={() => logoutUser()}>{t("user.logout")}</Button>
      )}
      <div className="my-10">
        {username && token && (
          <Button
            onClick={() => {
              // getPopulation(token || "");
              navigate("/board");
            }}
            className="max-w-100"
          >
            {t("startPage.board.server")}
          </Button>
        )}
        <div className="h-[200px]" />
        {isLocal && (
          <Button
            onClick={() => {
              // getPopulation(token || "");
              navigate("/board");
            }}
            className="max-w-100"
          >
            {t("startPage.board.local")}
          </Button>
        )}
      </div>
    </div>
  );
};
