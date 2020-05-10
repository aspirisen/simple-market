import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { UserModel, User } from "server/models/User";
import { NewUser } from "./inputs/NewUser";

@Resolver(User)
export class UsersController {
  @Query(() => [User])
  async users() {
    const result = UserModel.find({}).exec();
    return result;
  }

  @Mutation(() => User)
  async addUser(@Arg("data") data: NewUser) {
    const user = new User(data);
    const userModel = await UserModel.create(user);
    return userModel;
  }
}
