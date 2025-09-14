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
