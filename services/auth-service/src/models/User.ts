import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  last_name: string;
  role: "USER" | "ADMIN";
}

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true },
  password: String,
  name: String,
  last_name: String,
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
});

export const UserModel = model<IUser>("User", UserSchema);
