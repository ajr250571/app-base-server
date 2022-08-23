import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { typeDefs, resolvers } from "./schema/schema.js";

async function startApolloServer(typeDefs, resolvers) {
  const app = express();

  app.get('/',(req, res) => res.send('Wellcome to API'))

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });

  app.get('*', (req, res) => res.status(404).send('Page Not Found'))

  await new Promise(resolve => httpServer.listen({ port: 3000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}  `);
}

startApolloServer(typeDefs, resolvers)
