export const prepareTrainTypes = (vehicleType?: string): string => {
  if (!vehicleType) return "";
  const trains: string =
    "&verkehrsmittel[]=ICE&verkehrsmittel[]=EC_IC&verkehrsmittel[]=IR&verkehrsmittel[]=REGIONAL";
  const local: string =
    "&verkehrsmittel[]=SBAHN&verkehrsmittel[]=BUS&verkehrsmittel[]=TRAM";
  let setVehicleTypes = "";
  switch (vehicleType) {
    case "T":
      setVehicleTypes = trains;
      break;
    case "L":
      setVehicleTypes = local;
      break;
    case "A":
      setVehicleTypes = trains + local;
      break;
  }
  return setVehicleTypes;
};
