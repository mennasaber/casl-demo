import { Prop } from '@nestjs/mongoose';
import { Schema, SchemaFactory } from '@nestjs/mongoose/dist';
import mongoose, { Document } from 'mongoose';
import { RoleName } from 'src/utils/constants.utils';
export type RoleDocument = Role & Document;
@Schema({ autoIndex: true, timestamps: true })
export class Role {
  @Prop({ type: String, enum: RoleName })
  name: string;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Permission' })
  permissions: string[];
  @Prop({ type: Boolean, default: false })
  removed: boolean;
}
export const RoleSchema = SchemaFactory.createForClass(Role);
