import { Resolver, Query } from "type-graphql";
import { Product, ProductModel } from "server/models/Product";

@Resolver(Product)
export class ProductsController {
  @Query(() => [Product])
  async products() {
    const result = ProductModel.find({}).exec();
    return result;
  }
}
