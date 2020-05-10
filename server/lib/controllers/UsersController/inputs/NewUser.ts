import { Field, InputType } from "type-graphql";

@InputType()
export class NewUser {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}
