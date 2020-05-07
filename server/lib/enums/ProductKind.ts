import { registerEnumType } from "type-graphql";

export enum ProductKindEnum {
  SOUP = "SOUP",
  BREAD = "BREAD",
  MILK = "MILK",
  APPLE = "APPLE",
}

export type ProductKind = keyof typeof ProductKindEnum;

registerEnumType(ProductKindEnum, {
  name: "ProductKind",
  description: "Kinds of products",
});
