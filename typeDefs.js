import { gql } from "apollo-server-express";

export const typeDefs = gql`

type User {
  id: ID!
  email: String!
  name: String!
  theme: String!
}

input UserCreateInput {
  email: String!
  name: String
  theme: String
  password: String!
}

input UserUpdateInput {
  name: String
  theme: String
}

type ValidUser {
  id: ID
  email: String
  name: String
  theme: String
  isValid: Boolean!
}

type Query {
  user(id: ID!): User
  users: [User!]!
  validUser(email: String, password: String): ValidUser
}

type Mutation {
  createUser(user: UserCreateInput!): User
  updateUser(id: ID!, user: UserUpdateInput!): User
  deleteUser(id: ID!): User
}

`
