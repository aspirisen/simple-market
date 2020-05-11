import { Field, ObjectType, ID } from "type-graphql";
import { prop, getModelForClass, Ref, arrayProp } from "@typegoose/typegoose";
import { BaseModel } from "server/core/BaseModel";
import { User } from "./User";
import { Product } from "./Product";

@ObjectType()
export class Cart extends BaseModel<Cart> {
  @Field(() => ID)
  public id!: string;

  @Field(() => User)
  @prop({ ref: User })
  public user!: Ref<User>;

  @Field(() => [Product])
  @arrayProp({ ref: Product, default: [] })
  public products: Ref<Product>[] = [];

  @Field(() => Number)
  totalCount() {
    return this.products.length;
  }

  @Field(() => Number)
  totalPrice(): number {
    const res = this.products.reduce(
      (a, p) => ("price" in p ? a + p.price : 0),
      0
    );

    return res;
  }
}

export const CartModel = getModelForClass(Cart, {
  schemaOptions: { collection: "Cart" },
});
