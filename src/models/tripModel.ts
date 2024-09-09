import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
})
export class Trip {
  @IsString()
  @prop({ required: true })
  public origin!: string;

  @IsString()
  @prop({ required: true })
  public destination!: string;

  @IsNumber()
  @prop({ required: true })
  public duration!: number;

  @IsNumber()
  @prop({ required: true })
  public cost!: number;

  @IsString()
  @prop({ required: true })
  public type!: string;

  @IsString()
  @prop()
  public display_name!: string;

  @IsBoolean()
  @prop({ default: false })
  public isDeleted!: boolean;

  @IsOptional()
  @prop()
  public deletedAt?: Date;
}

export const TripModel = getModelForClass(Trip);
