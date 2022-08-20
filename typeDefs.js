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

/*
type Msg {
  code: String
  message: String
}

type Task {
  id: ID
  title: String
  description: String
}

input TaskInput {
  title: String
  description: String
}

type Query {
  taskFindMany: [Task!]! 
  taskFindUnique(id: ID!): Task
}

type Mutation {
  taskCreate(task: TaskInput!): Task
  taskDelete(id: ID!): Msg
  taskUpdate(id: ID!, task: TaskInput): Task
}
*/