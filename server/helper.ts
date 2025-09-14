export const prepareTrainTypes = (vehicleType?: string): string => {
  if (!vehicleType) return "";
  const trains: string =
        "&verkehrsmittel[]=ICE&verkehrsmittel[]=EC_IC&verkehrsmittel[]=IR&verkehrsmittel[]=REGIONAL";
    const local: string =
        "&verkehrsmittel[]=SBAHN&verkehrsmittel[]=BUS&verkehrsmittel[]=TRAM&verkehrsmittel[]=UBAHN&verkehrsmittel[]=ANRUFPFLICHTIG";
    const ships: string =
        "&verkehrsmittel[]=SCHIFF";
  let setVehicleTypes = "";
  switch (vehicleType) {
    case "Trains":
      setVehicleTypes = trains;
      break;
    case "Local":
      setVehicleTypes = local;
      break;
    case "Ships":
      setVehicleTypes = ships;
      break;
    case "All":
      setVehicleTypes = trains + local + ships;
    break;
  }
  return setVehicleTypes;
};

export const filterDates = (
    datePlanned: string,
    dateCurrent: string,
    limit: string,
) => {
    const date1 = new Date(datePlanned);
    const date2 = new Date(dateCurrent);
    const seconds: number = Number(limit) * 60 * 1000;
    const targetTimeDate = new Date(new Date().getTime() + seconds);
    return date1 <= targetTimeDate || date2 <= targetTimeDate;
};
