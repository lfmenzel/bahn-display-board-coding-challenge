import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux";
import { Button } from "@/components/ui/button.tsx";
import { useUser } from "@/hooks/useUser.ts";
import { StatisticsUser, useStatistics } from "@/hooks/useStatistics.ts";
import { setUsername } from "@/redux/user.ts";
import { setPassword } from "@/redux/password.ts";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { TextField } from "@/components/App";
import { TableComponent } from "@/components/App/TableComponent.tsx";
import { formatDate } from "@/components/App/helper.ts";

export const StartPage = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { signupUser, loginUser, logoutUser } = useUser();
  const { statistics } = useStatistics();
  const { username, token } = useAppSelector((state) => state.user);
  const password = useAppSelector((state) => state.password.password);
  const isLocal = import.meta.env.VITE_IS_LOCAL || 3000;
  const [startPassword, setStartPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [startPasswordError, setStartPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("signup");
  const [statisticsUsers, setsSatisticsUsers] = useState<StatisticsUser[]>([]);

  return (
    <div className="min-h-screen max-h-screen w-full overflow-y-auto overflow-x-hidden">
      <Tabs value={activeTab}>
        <TabsList className="w-full mb-5">
          <TabsTrigger
            value="login"
            onClick={() => {
              setErrorMessage("");
              setUsernameError(false);
              setPasswordError(false);
              setStartPasswordError(false);
              setActiveTab("login");
            }}
          >
            {t(`user.login`)}
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            onClick={() => {
              setErrorMessage("");
              setUsernameError(false);
              setPasswordError(false);
              setStartPasswordError(false);
              setActiveTab("signup");
            }}
          >
            {t(`user.signup`)}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          {!token && (
            <div>
              <div className="w-full justify-center items-center gap-4 flex">
                <TextField
                  name="username"
                  value={username}
                  onChange={(value) => dispatch(setUsername(value))}
                  placeholder={t("user.username")}
                  error={usernameError}
                  className="w-full max-w-[200px]"
                />
                <TextField
                  name="password"
                  value={password}
                  onChange={(value) => dispatch(setPassword(value))}
                  placeholder={t("user.password")}
                  type="password"
                  error={passwordError}
                  className="w-full max-w-[200px]"
                />
                <Button
                  onClick={() => {
                    let message = "";
                    let valid = true;
                    if (!username || username.length < 3) {
                      setUsernameError(true);
                      message = message + t("user.error.usernameMissing");
                      valid = false;
                    }
                    if (!password || password.length < 3) {
                      setPasswordError(true);
                      message = message + t("user.error.passwordMissing");
                      valid = false;
                    }
                    if (valid) {
                      loginUser(username, password).then((result) => {
                        if (result) {
                          setUsernameError(false);
                          setPasswordError(false);
                          setErrorMessage("");
                        } else {
                          setUsernameError(true);
                          setPasswordError(true);
                          setErrorMessage(
                            t("user.error.usernamePasswordMismatch"),
                          );
                        }
                      });
                    }
                    setErrorMessage(message);
                  }}
                >
                  {t("user.login")}
                </Button>
              </div>
              {errorMessage && (
                <div className="text-error mt-5">{errorMessage}</div>
              )}
            </div>
          )}
          {token && (
            <div className="w-full justify-center items-center gap-4 flex flex-col">
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
              <Button variant="secondary" onClick={() => logoutUser()}>
                {t("user.logout")}
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="signup">
          <div>
            <div className="w-full justify-center items-center gap-4 flex">
              <TextField
                name="username"
                value={username}
                onChange={(value) => dispatch(setUsername(value))}
                placeholder={t("user.username")}
                error={usernameError}
                className="w-full max-w-[200px]"
              />
              <TextField
                name="password"
                value={password}
                onChange={(value) => dispatch(setPassword(value))}
                placeholder={t("user.password")}
                type="password"
                error={passwordError}
                className="w-full max-w-[200px]"
              />
              <TextField
                name="startPassword"
                value={startPassword}
                onChange={(value) => setStartPassword(value)}
                placeholder={t("user.startPassword")}
                type="password"
                error={startPasswordError}
                className="w-full max-w-[200px]"
              />
              <Button
                onClick={() => {
                  let message = "";
                  let valid = true;
                  if (!username || username.length < 3) {
                    setUsernameError(true);
                    message = message + t("user.error.usernameMissing");
                    valid = false;
                  }
                  if (!password || password.length < 3) {
                    setPasswordError(true);
                    message = message + t("user.error.passwordMissing");
                    valid = false;
                  }
                  if (!startPassword || startPassword.length < 3) {
                    setStartPasswordError(true);
                    message = message + t("user.error.startPasswordMissing");
                    valid = false;
                  }
                  if (valid) {
                    signupUser(username, password, startPassword).then(
                      (result) => {
                        if (result) {
                          setUsernameError(false);
                          setPasswordError(false);
                          setStartPasswordError(false);
                          setActiveTab("login");
                          setErrorMessage("");
                        } else {
                          setUsernameError(true);
                          setPasswordError(true);
                          setStartPasswordError(true);
                          setErrorMessage(t("user.error.startPasswordWrong"));
                        }
                      },
                    );
                  }
                  setErrorMessage(message);
                }}
              >
                {t("user.signup")}
              </Button>
            </div>
          </div>
          {errorMessage && (
            <div className="text-error mt-5">{errorMessage}</div>
          )}
        </TabsContent>
      </Tabs>

      <div className="h-[300px] my-10" />
      {isLocal && (
        <Button
          onClick={() => navigate("/board")}
          className="w-full"
          variant="secondary"
        >
          {t("startPage.board.local")}
        </Button>
      )}

      {isLocal && (
        <Button
          onClick={() =>
            statistics().then((result) => {
              if (typeof result != "boolean") {
                setsSatisticsUsers(
                  result.map((user: StatisticsUser) => {
                    return {
                      username: `${user.username.substring(0, 8)}...`,
                      creationDate: formatDate(
                        user.creationDate,
                        "dateTime",
                        t,
                      ),
                      lastActiveDate: formatDate(
                        user.lastActiveDate,
                        "dateTime",
                        t,
                      ),
                      logins: user.logins,
                      loginErrors: user.loginErrors,
                      stationSearches: user.stationSearches,
                      arrivalDisplays: user.arrivalDisplays,
                      departuresDisplays: user.departuresDisplays,
                    };
                  }),
                );
                console.log(statisticsUsers);
              }
            })
          }
          className="my-4"
          variant="secondary"
        >
          {t("startPage.board.statistics")}
        </Button>
      )}

      {statisticsUsers && statisticsUsers.length > 0 && (
        <TableComponent
          headers={[
            t("statistics.username"),
            t("statistics.creationDate"),
            t("statistics.lastActiveDate"),
            t("statistics.logins"),
            t("statistics.loginErrors"),
            t("statistics.stationSearches"),
            t("statistics.arrivalDisplays"),
            t("statistics.departuresDisplays"),
          ]}
          rows={statisticsUsers}
          className="border border-muted-foreground/50"
        />
      )}
    </div>
  );
};
