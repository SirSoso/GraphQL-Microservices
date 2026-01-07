import { GraphQLContext } from "../types/context";
import { SignInArgs, SignUpArgs } from "../types/args";
import { AuthService } from "../services/auth-service";

export const resolvers = {
  Query: {
    me: (_: unknown, __: unknown, { user }: GraphQLContext) => user,
  },
  Mutation: {
    login: (_: unknown, args: SignInArgs) => AuthService.login(args),
    signup: (_: unknown, args: SignUpArgs) => AuthService.signup(args),
  },
};
