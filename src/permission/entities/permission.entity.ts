import { Prop } from '@nestjs/mongoose';
import { Schema, SchemaFactory } from '@nestjs/mongoose/dist';
import { Document } from 'mongoose';
import { Action, Subject } from 'src/utils/constants.utils';
export type PermissionDocument = Permission & Document;
@Schema({ autoIndex: true, timestamps: true })
export class Permission {
  @Prop({ type: String, enum: Action })
  action: Action;
  @Prop({ type: String, enum: Subject })
  subject: Subject;
  @Prop({ type: Boolean, default: false })
  removed: boolean;
}
export const PermissionSchema = SchemaFactory.createForClass(Permission);
