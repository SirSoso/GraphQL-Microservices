import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

import { IUser, UserModel } from "../models/User";
import { SignInArgs, SignUpArgs } from "../types/args";

interface AuthResponse {
  user: IUser;
  token: string;
}

export class AuthService {
  static async signup({ input }: SignUpArgs): Promise<AuthResponse> {
    const { password, ...rest } = input;
    const hashed = await bcrypt.hash(password, 10);
    const user = new UserModel({
      ...rest,
      password: hashed,
    });
    const result = await user.save();
    const token = jwt.sign(
      { id: result.id },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "1h",
      }
    );
    return { token, user };
  }

  static async login({ email, password }: SignInArgs): Promise<AuthResponse> {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User not found");

    const valid = bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid password");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as Secret, {
      expiresIn: "1h",
    });
    return { token, user };
  }
}
