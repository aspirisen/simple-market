type DataPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type DataPropertiesOnly<T> = {
  [P in DataPropertyNames<T>]: T[P];
};

export class BaseModel<T> {
  constructor(data: Omit<DataPropertiesOnly<T>, "id">) {
    Object.assign(this, data);
  }
}
