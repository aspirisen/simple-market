/** This file is generated by webpack, do not edit it. */
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: string;
};

export type Cart = {
  __typename?: "Cart";
  id: Scalars["ID"];
  user: User;
  items: Array<Item>;
  deliveryDate?: Maybe<Scalars["DateTime"]>;
  totalCount: Scalars["Float"];
  totalPrice: Scalars["Float"];
};

export type Item = {
  __typename?: "Item";
  product: Product;
  quantity: Scalars["Float"];
};

export type Mutation = {
  __typename?: "Mutation";
  changeItemsQuantity: Cart;
  addUser: User;
};

export type MutationChangeItemsQuantityArgs = {
  quantity: Scalars["Float"];
  productId: Scalars["String"];
};

export type MutationAddUserArgs = {
  data: NewUser;
};

export type NewUser = {
  name: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Product = {
  __typename?: "Product";
  id: Scalars["ID"];
  name: Scalars["String"];
  price: Scalars["Float"];
  kind: ProductKind;
  imageUrl: Scalars["String"];
};

/** Kinds of products */
export type ProductKind = "SOUP" | "BREAD" | "MILK" | "APPLE";

export type Query = {
  __typename?: "Query";
  cart: Cart;
  products: Array<Product>;
  currentUser: User;
  users: Array<User>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: Scalars["String"];
  name: Scalars["String"];
};
