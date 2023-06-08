/// <reference types="express-serve-static-core" />
import { Server } from 'http';
import express from 'express';
import { GraphQLSchema } from 'graphql';
import { ApolloServer } from '@apollo/server';
import type { KeystoneConfig, KeystoneContext } from '../../types';
export declare const createExpressServer: (config: KeystoneConfig, graphQLSchema: GraphQLSchema, context: KeystoneContext) => Promise<{
    expressServer: express.Express;
    apolloServer: ApolloServer<KeystoneContext>;
    httpServer: Server;
}>;
//# sourceMappingURL=createExpressServer.d.ts.map