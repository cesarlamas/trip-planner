import Trip, {ITrip} from "../models/trip";

export async function addTrip(origin: string, destination: string, duration: number, cost: number,  type: string, display_name: string): Promise<any> {
  try {
    const newTrip: ITrip = await Trip.create({origin, destination, duration, cost, type, display_name});
    return newTrip;
  } catch (error) {
    console.log('error in the repositorys', error);
    throw error;
  }
}

export async function getAllSavedTrips(): Promise<ITrip[]> {
  try {
    const savedTrips: ITrip[] = await Trip.find();
    return savedTrips;
  } catch (error) {
    console.log('error getting saved trips');
    throw error;
  }
}
