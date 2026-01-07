import {
  ApolloGateway,
  IntrospectAndCompose,
  RemoteGraphQLDataSource,
} from "@apollo/gateway";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

async function bootstrap() {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [{ name: "auth", url: "http://localhost:4001/graphql" }],
    }),
    buildService({ url }) {
      return new RemoteGraphQLDataSource({
        url,
        willSendRequest({ request, context }) {
          const auth = context.req?.headers.authorization;
          if (auth) {
            request.http?.headers.set("authorization", auth);
          }
        },
      });
    },
  });

  const server = new ApolloServer({ gateway });
  await server.start();

  const app = express();
  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    })
  );

  app.listen(4000, () =>
    console.log("Gateway running on http://localhost:4000/graphql")
  );
}

bootstrap();
