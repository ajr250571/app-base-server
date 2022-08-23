import { gql } from "apollo-server-core";
import { userTypeDefs, userResolvers } from "./user.schema.js";

const rootTypeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`

export const typeDefs = [rootTypeDefs, userTypeDefs]
export const resolvers = [userResolvers]
