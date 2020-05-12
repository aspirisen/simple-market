import { Field, ObjectType } from "type-graphql";
import { prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "server/core/BaseModel";
import { Product } from "./Product";

@ObjectType()
export class Item extends BaseModel<Item> {
  @Field(() => Product)
  @prop({ ref: Product })
  public product!: Ref<Product>;

  @Field()
  @prop()
  public quantity!: number;
}
