import mongoose, {Schema, Document, model} from "mongoose";

export enum TripType {
  Train = 'train',
  Flight = 'flight',
  Bus = 'bus',
  Car = 'car'
}
export interface ITrip extends Document {
  origin: string;  // Use lowercase 'string' for primitive types
  destination: string;
  duration: number;
  cost: number;
  type: TripType;  // Use the enum to restrict to certain types
  display_name: string;
}
const TripSchema: Schema = new Schema<ITrip>({
  origin: {type: String, required: true},
  destination: {type: String, required: true},
  duration: {type: Number, required: true},
  cost: {type: Number, required: true},
  type: {type: String, required: true},
  display_name: { type: String, required: true },
});

export default model<ITrip>('Trip', TripSchema);