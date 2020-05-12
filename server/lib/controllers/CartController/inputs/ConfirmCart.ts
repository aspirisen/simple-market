import { Field, InputType } from "type-graphql";

@InputType()
export class ConfirmCart {
  @Field()
  deliveryDate!: Date;

  @Field()
  address!: string;
}
