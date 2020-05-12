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

  @Field(() => String, { nullable: true })
  specialOffer() {
    switch (this.kind) {
      case "APPLE":
        return "Apples have 10% off their normal price this week";
      case "BREAD":
        return "Buy 2 tins of soup and get a loaf of bread for half price";
      default:
        return null;
    }
  }
}

export const ProductModel = getModelForClass(Product, {
  schemaOptions: { collection: "Product" },
});
