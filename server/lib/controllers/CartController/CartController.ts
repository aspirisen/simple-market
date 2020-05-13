import { Types } from "mongoose";
import { Resolver, Query, Ctx, Mutation, Arg } from "type-graphql";
import { Context } from "server/core/GraphQL";
import { Cart, CartModel } from "server/models/Cart";
import { Item } from "server/models/Item";
import { Order, OrderModel } from "server/models/Order";
import { ConfirmCart } from "./inputs/ConfirmCart";

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

    result?.items.sort((a, b) => {
      if ("price" in a.product && "price" in b.product) {
        return a.product.price - b.product.price;
      }

      return 0;
    });

    return result;
  }

  @Query(() => [Order])
  async orders(@Ctx() ctx: Context) {
    const result = await OrderModel.find({ user: ctx.user })
      .populate([
        {
          path: "user",
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

  @Mutation(() => Cart)
  async clearCart(@Ctx() ctx: Context) {
    await CartModel.updateOne(
      { user: ctx.user },
      {
        $set: { items: [] },
      }
    ).exec();

    return this.cart(ctx);
  }

  @Mutation(() => Order)
  async confirmCart(@Arg("data") data: ConfirmCart, @Ctx() ctx: Context) {
    const cartModel = await this.cart(ctx);

    if (!cartModel) {
      throw new Error("Cart is not defined");
    }

    const cartJson: typeof cartModel = cartModel.toObject({ virtuals: true });
    const cart = new Cart({ items: cartJson.items, user: cartJson.user });

    const order = new Order({
      address: data.address,
      deliveryDate: data.deliveryDate,
      items: cart.items,
      user: cart.user,
      totalCount: cart.totalCount(),
      totalPrice: cart.totalPrice(),
    });

    const orderSaved = await OrderModel.create(order);

    return orderSaved;
  }
}
