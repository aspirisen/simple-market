import { prop } from "@typegoose/typegoose";
import { Product } from "./Product";

export class OrderItem {
  @prop({})
  public product!: Product;

  @prop()
  public quantity!: number;
}
