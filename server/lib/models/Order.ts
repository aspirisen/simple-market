import { Field, ObjectType, ID } from "type-graphql";
import { prop, getModelForClass, Ref, arrayProp } from "@typegoose/typegoose";
import { BaseModel } from "server/core/BaseModel";
import { User } from "./User";
import { Item } from "./Item";
import { OrderItem } from "./OrderItem";

@ObjectType()
export class Order extends BaseModel<Order> {
  @Field(() => ID)
  public id!: string;

  @Field(() => User)
  @prop({ ref: User })
  public user!: Ref<User>;

  @Field(() => [Item])
  @arrayProp({ items: OrderItem })
  public items!: Item[];

  @Field()
  @prop()
  public totalCount!: number;

  @Field()
  @prop()
  public totalPrice!: number;

  @Field()
  @prop()
  public address!: string;

  @Field()
  @prop()
  public deliveryDate?: Date;
}

export const OrderModel = getModelForClass(Order, {
  schemaOptions: { collection: "Order" },
});
