import { gql } from "apollo-server-core";
import { User, Users, CreateUser, UpdateUser, DeleteUser, ValidUser } from "../services/user.service.js";

export const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    theme: String
    error: String
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

  extend type Query {
    user(id: ID!): User
    users: [User!]!
    validUser(email: String, password: String): ValidUser
  }

  extend type Mutation {
    createUser(user: UserCreateInput!): User
    updateUser(id: ID!, user: UserUpdateInput!): User
    deleteUser(id: ID!): User
  }
`

export const userResolvers = {
  Query: {

    users: async () => {
      return await Users()
    },
    user: async (_, { id }) => {
      return await User(id)
    },
    validUser: async (_, { email, password }) => {
      return await ValidUser(email, password)
    },

  },
  Mutation: {
    // User
    createUser: async (_, { user }) => {
      return await CreateUser(user)
    },
    updateUser: async (_, { id, user }) => {
      return await UpdateUser(id, user)
    },
    deleteUser: async (_, { id }) => {
      return await DeleteUser(id)
    }

  }
}