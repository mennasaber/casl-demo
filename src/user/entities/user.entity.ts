import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema({ autoIndex: true, timestamps: true })
export class User {
  @Prop({ type: String })
  name: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
