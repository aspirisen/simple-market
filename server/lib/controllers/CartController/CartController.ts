import { Types } from "mongoose";
import { Resolver, Query, Ctx, Mutation, Arg } from "type-graphql";
import { Context } from "server/core/GraphQL";
import { Cart, CartModel } from "server/models/Cart";
import { Item } from "server/models/Item";

@Resolver(Cart)
export class CartController {
  @Query(() => Cart)
  async cart(@Ctx() ctx: Context) {
    const result = await CartModel.findOne({ user: ctx.user })
      .populate([
        {
          path: "user",
        },
        {
          path: "items.product",
        },
      ])
      .exec();

    return result;
  }

  @Mutation(() => Cart)
  async changeItemsQuantity(
    @Arg("productId", () => String) productId: Types.ObjectId,
    @Arg("quantity", () => Number) quantity: number,
    @Ctx() ctx: Context
  ) {
    if (quantity < 1) {
      await CartModel.updateOne(
        { user: ctx.user },
        { $pull: { items: { product: productId } } }
      ).exec();
    } else {
      await CartModel.updateOne(
        { user: ctx.user },
        {
          $pull: { items: { product: productId } },
        }
      ).exec();

      await CartModel.updateOne(
        { user: ctx.user },
        {
          $push: { items: new Item({ product: productId, quantity }) },
        }
      ).exec();
    }

    return this.cart(ctx);
  }
}
