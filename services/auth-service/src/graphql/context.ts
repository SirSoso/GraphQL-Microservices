import jwt, { Secret, JwtPayload } from "jsonwebtoken";

import { IUser, UserModel } from "../models/User";

interface TokenPayload extends JwtPayload {
  id: string;
}

export const getUserFromToken = async (
  authorization?: string
): Promise<IUser | null> => {
  if (!authorization) return null;

  try {
    const token = authorization.replace("Bearer ", "");

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as unknown as TokenPayload;
    return UserModel.findById(decoded.id);
  } catch {
    return null;
  }
};
