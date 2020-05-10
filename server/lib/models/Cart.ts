import { Field, ObjectType } from "type-graphql";
import {
  prop,
  getModelForClass,
  Ref,
  arrayProp,
  isDocumentArray,
} from "@typegoose/typegoose";
import { BaseModel } from "server/core/BaseModel";
import { User } from "./User";
import { Product } from "./Product";

@ObjectType()
export class Cart extends BaseModel<Cart> {
  @Field(() => User)
  @prop({ ref: User })
  public user!: Ref<User>;

  @Field(() => [Product])
  @arrayProp({ ref: Product })
  public products!: Ref<Product>[];

  @Field()
  get totalCount() {
    if (!isDocumentArray(this.products)) {
      throw new Error("Products are not populated");
    }

    return this.products.length;
  }

  @Field()
  get totalPrice() {
    if (!isDocumentArray(this.products)) {
      throw new Error("Products are not populated");
    }

    const res = this.products.reduce((a, p) => a + p.price, 0);
    return res;
  }
}

export const CartModel = getModelForClass(Cart, {
  schemaOptions: { collection: "Cart" },
});
