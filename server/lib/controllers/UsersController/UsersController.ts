import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { UserModel, User } from "server/models/User";
import { Context } from "server/core/GraphQL";
import { NewUser } from "./inputs/NewUser";

@Resolver(User)
export class UsersController {
  @Query(() => User)
  currentUser(@Ctx() ctx: Context) {
    return ctx.user;
  }

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
