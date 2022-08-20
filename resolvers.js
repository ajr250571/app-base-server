import { Users, ValidUser, CreateUser, User, UpdateUser, DeleteUser } from "./services/user.service.js";

export const resolvers = {
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