import { useAppSelector } from "@/redux";
import { fetchStatistics } from "@/api/statistics.ts";

export interface StatisticsUser {
  username: string;
  creationDate: string;
  lastActiveDate: string;
  logins: number;
  loginErrors: number;
  stationSearches: number;
  arrivalDisplays: number;
  departuresDisplays: number;
}

export const useStatistics = () => {
  const { token } = useAppSelector((state) => state.user);

  const statistics = async (): Promise<StatisticsUser[] | boolean> => {
    const result = fetchStatistics(token).then((data) => {
      if (data != false) {
        return data.data.users as StatisticsUser[];
      }
      return false;
    });
    return await result;
  };

  return { statistics };
};
