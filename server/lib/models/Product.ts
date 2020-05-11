import { Field, ObjectType, ID } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { BaseModel } from "server/core/BaseModel";
import { ProductKind, ProductKindEnum } from "server/enums/ProductKind";

@ObjectType()
export class Product extends BaseModel<Product> {
  @Field(() => ID)
  public id!: string;

  @Field()
  @prop()
  public name!: string;

  @Field()
  @prop()
  public price!: number;

  @Field(() => ProductKindEnum)
  @prop({ enum: ProductKindEnum })
  public kind!: ProductKind;

  @Field()
  @prop()
  public imageUrl!: string;
}

export const ProductModel = getModelForClass(Product, {
  schemaOptions: { collection: "Product" },
});
