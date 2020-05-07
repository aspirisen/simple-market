import { Field, ID } from "type-graphql";

type DataPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type DataPropertiesOnly<T> = {
  [P in DataPropertyNames<T>]: T[P];
};

export class BaseModel<T> {
  @Field(() => ID)
  public id!: string;

  constructor(data: Omit<DataPropertiesOnly<T>, "id">) {
    Object.entries(data).forEach(([key, value]) => {
      (this as any)[key] = value;
    });
  }
}
