import { Resolver, Query } from "type-graphql";
import { Client, ClientModel } from "server/models/Client";

@Resolver(Client)
export class ClientsController {
  @Query(() => [Client])
  async clients() {
    const result = ClientModel.find({})
      .populate([{ path: "user" }, { path: "cart" }])
      .exec();
    return result;
  }
}
