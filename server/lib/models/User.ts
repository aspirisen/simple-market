import * as crypto from "crypto";
import { Field, ObjectType, ID } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { BaseModel } from "server/core/BaseModel";

@ObjectType()
export class User extends BaseModel<User> {
  @Field(() => ID)
  public id!: string;

  @Field()
  @prop()
  public email!: string;

  @Field()
  @prop()
  public name!: string;

  @prop()
  private passwordHash!: string;

  public get password() {
    return this.passwordHash;
  }

  public set password(newPass) {
    this.passwordHash = this.getPasswordHash(newPass);
  }

  public verifyPassword(password: string) {
    const hashedPass = this.getPasswordHash(password);
    return this.password === hashedPass;
  }

  private getPasswordHash(password: string) {
    const hashedPass = crypto
      .pbkdf2Sync(password, "", 1, 128, "sha1")
      .toString();

    return hashedPass;
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { collection: "User" },
});
