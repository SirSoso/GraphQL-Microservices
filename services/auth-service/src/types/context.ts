import { IUser } from "../models/User";

export interface GraphQLContext {
  user: IUser | null;
}
