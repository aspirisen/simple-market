import { Types } from "mongoose";
import { Resolver, Query, Ctx, Mutation, Arg } from "type-graphql";
import { Context } from "server/core/GraphQL";
import { Cart, CartModel } from "server/models/Cart";

@Resolver(Cart)
export class CartController {
  @Query(() => Cart)
  async cart(@Ctx() ctx: Context) {
    const result = await CartModel.findOne({ user: ctx.user })
      .populate([{ path: "user" }, { path: "products" }])
      .exec();

    return result;
  }

  @Mutation(() => Cart)
  async addToCart(
    @Arg("productId", () => String) productId: Types.ObjectId,
    @Ctx() ctx: Context
  ) {
    await CartModel.updateOne(
      { user: ctx.user },
      { $push: { products: productId } }
    );

    return this.cart(ctx);
  }

  @Mutation(() => Cart)
  async removeFromCart(
    @Arg("productId", () => String) productId: Types.ObjectId,
    @Ctx() ctx: Context
  ) {
    await CartModel.updateOne(
      { user: ctx.user },
      { $pull: { products: productId } }
    );

    return this.cart(ctx);
  }
}
