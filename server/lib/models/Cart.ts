import { Field, ObjectType, ID } from "type-graphql";
import { prop, getModelForClass, Ref, arrayProp } from "@typegoose/typegoose";
import { BaseModel } from "server/core/BaseModel";
import { User } from "./User";
import { Item } from "./Item";

@ObjectType()
export class Cart extends BaseModel<Cart> {
  @Field(() => ID)
  public id!: string;

  @Field(() => User)
  @prop({ ref: User })
  public user!: Ref<User>;

  @Field(() => [Item])
  @arrayProp({ items: Item })
  public items!: Item[];

  @Field({ nullable: true })
  @prop()
  public deliveryDate?: Date;

  @Field(() => Number)
  totalCount() {
    const result = this.items.reduce(
      (a, i) => ("quantity" in i ? a + i.quantity : 0),
      0
    );

    return result;
  }

  @Field(() => Number)
  totalPrice(): number {
    const items = this.items.slice().sort((a, b) => {
      if ("price" in a.product && "price" in b.product) {
        return b.product.price - a.product.price;
      }

      return 0;
    });

    const soupQuantity = items.reduce((a, i) => {
      let next = a;

      if ("kind" in i.product && i.product.kind === "SOUP") {
        next += i.quantity;
      }

      return next;
    }, 0);

    let breadsForHalfPrice = Math.trunc(soupQuantity / 2);

    const price = this.items.reduce((a, i) => {
      let next = a;

      if ("kind" in i.product) {
        if (i.product.kind === "APPLE") {
          next = i.quantity * (i.product.price - i.product.price * 0.1);
        } else if (i.product.kind === "BREAD" && breadsForHalfPrice > 0) {
          const halfPriceQuantity = breadsForHalfPrice - i.quantity;
          const quantityDiscount =
            halfPriceQuantity > 0 ? i.quantity : breadsForHalfPrice;

          breadsForHalfPrice -= quantityDiscount;

          next =
            a +
            i.quantity * i.product.price -
            quantityDiscount * (i.product.price / 2);
        } else {
          next = a + i.quantity * i.product.price;
        }
      }

      return next;
    }, 0);

    const result = parseFloat(price.toFixed(2));
    return result;
  }
}

export const CartModel = getModelForClass(Cart, {
  schemaOptions: { collection: "Cart" },
});
