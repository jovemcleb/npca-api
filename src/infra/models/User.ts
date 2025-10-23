import {
  DocumentType,
  getModelForClass,
  prop,
  ReturnModelType,
} from "@typegoose/typegoose";

export enum UserRole {
  ADMIN = "admin",
  STUDENT = "student",
  TEACHER = "teacher",
}

export class User {
  @prop({ required: true, type: () => String })
  public name!: string;

  @prop({ required: true, unique: true, type: () => String })
  public email!: string;

  @prop({ required: true, select: false, type: () => String })
  public password!: string;

  @prop({ required: false, type: () => String })
  public description?: string;

  @prop({ required: true, type: () => String })
  public institution!: string;

  @prop({ required: true, type: () => String })
  public course!: string;

  @prop({ required: false, type: () => Array })
  public articles?: { title: string; url: string; description?: string }[];

  @prop({ required: false, type: () => Array })
  public projects?: { title: string; description?: string }[];

  @prop({
    required: true,
    default: UserRole.STUDENT,
    enum: UserRole,
    type: () => String,
  })
  public role!: UserRole;
}

export const UserModel = getModelForClass(User);

export type UserDocument = DocumentType<User>;
export type UserModelType = ReturnModelType<typeof User>;

UserModel.schema.virtual("id").get(function (this: any) {
  return this._id?.toString();
});

UserModel.schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc: any, ret: any) => {
    if (ret.password) delete ret.password;
    if (ret._id) delete ret._id;
    return ret;
  },
});

UserModel.schema.set("toObject", {
  virtuals: true,
  transform: (_doc: any, ret: any) => {
    if (ret.password) delete ret.password;
    if (ret._id) delete ret._id;
    return ret;
  },
});
