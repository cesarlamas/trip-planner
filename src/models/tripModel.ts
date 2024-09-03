import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Trip {
  @prop({ required: true })
  public origin!: string;

  @prop({ required: true })
  public destination!: string;

  @prop({ required: true })
  public duration!: number;

  @prop({ required: true })
  public cost!: number;

  @prop({ required: true })
  public type!: string;

  @prop({ required: true })
  public display_name!: string;

  @prop({ default: false })
  public isDeleted!: boolean;

  @prop()
  public deletedAt?: Date;
}

export const TripModel = getModelForClass(Trip);
