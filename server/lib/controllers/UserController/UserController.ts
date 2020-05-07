import { Resolver, Query, Arg } from "type-graphql";
import { User, UserModel } from "server/models/User";

@Resolver(User)
export class UserController {
  @Query(() => User)
  async user(@Arg("id") id: string) {
    const result = await UserModel.findById(id).exec();

    if (result === undefined) {
      throw new Error(id);
    }

    return result;
  }

  @Query(() => [User])
  async users() {
    const result = UserModel.find({}).exec();
    return result;
  }
}
