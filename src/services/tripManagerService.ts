import {addTrip} from "../repositories-services/trip-manager.repositor-service"

export default async function saveNewTrip(origin: string, destination: string, duration: number, cost: number, type:string, display_name: string) {
  try {
    console.log('type of', duration);
    const newTrip: any = await addTrip(origin, destination, duration, cost, type, display_name);
    return newTrip;
  } catch (e) {
    throw e;
  }
}
