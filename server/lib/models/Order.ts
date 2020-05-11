import { Field, ObjectType, ID } from "type-graphql";
import { prop, getModelForClass, Ref, arrayProp } from "@typegoose/typegoose";
import { BaseModel } from "server/core/BaseModel";
import { User } from "./User";
import { Product } from "./Product";

@ObjectType()
export class Order extends BaseModel<Order> {
  @Field(() => ID)
  public id!: string;

  @Field(() => User)
  @prop({ ref: User })
  public user!: Ref<User>;

  @Field(() => [Product])
  @arrayProp({ items: Product })
  public products!: Product[];

  @Field()
  @prop()
  public totalPrice!: number;
}

export const OrderModel = getModelForClass(Order, {
  schemaOptions: { collection: "Order" },
});
