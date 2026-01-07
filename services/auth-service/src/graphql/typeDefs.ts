import { DocumentNode, parse } from "graphql";

export const typeDefs: DocumentNode = parse(`
  type User {
    id: ID!
    name: String!
    last_name: String!
    email: String!
    role: String!
  }
    
  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterUserInput {
    email: String!
    name: String!
    last_name: String!
    password: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    signup(input: RegisterUserInput!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`);
