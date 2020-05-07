import { Field, ObjectType } from "type-graphql";
import { prop, getModelForClass, Ref, arrayProp } from "@typegoose/typegoose";
import { BaseModel } from "server/core/BaseModel";
import { User } from "./User";
import { Product } from "./Product";

@ObjectType()
export class Client extends BaseModel<Client> {
  @Field(() => User)
  @prop({ ref: User })
  public user!: Ref<User>;

  @Field(() => [Product])
  @arrayProp({ ref: Product })
  public cart!: Ref<Product[]>;
}

export const ClientModel = getModelForClass(Client, {
  schemaOptions: { collection: "Client" },
});
