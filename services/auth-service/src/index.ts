import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@as-integrations/express5";

import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { GraphQLContext } from "./types/context";
import { getUserFromToken } from "./graphql/context";

dotenv.config();

async function bootstrap() {
  await mongoose.connect(process.env.MONGO_URI!);

  const server = new ApolloServer<GraphQLContext>({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  });

  await server.start();

  const app = express();
  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        user: await getUserFromToken(req.headers.authorization),
      }),
    })
  );

  app.listen(process.env.PORT, () =>
    console.log(`Auth Service running on ${process.env.PORT}`)
  );
}

bootstrap();
