import mongoose from "mongoose";
import { UserModel, User } from "server/models/User";
import { Client, ClientModel } from "server/models/Client";
import { Product, ProductModel } from "server/models/Product";

export interface DbConfig {
  url: string;
  dbName?: string;
}

export class DB {
  constructor(private config: DbConfig) {}

  public async populate() {
    await mongoose.connect(this.config.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: this.config.dbName,
    });

    await this.addInitialData();
  }

  private async addInitialData() {
    const hasBeenInitialized = await UserModel.findOne({});

    if (hasBeenInitialized) {
      return;
    }

    const soup = new Product({ name: "Soup", kind: "SOUP", price: 0.65 });
    const bread = new Product({ name: "Bread", kind: "BREAD", price: 0.8 });
    const milk = new Product({ name: "Milk", kind: "MILK", price: 1.3 });
    const apple = new Product({ name: "Apple", kind: "APPLE", price: 1 });

    const products = ((await ProductModel.create(
      soup,
      bread,
      milk,
      apple
    )) as unknown) as Product[];

    const user = new User({
      email: "one@one.com",
      name: "one",
      password: "one",
    });

    const savedUser = await UserModel.create(user);

    const client = new Client({
      cart: products,
      user: savedUser,
    });

    await ClientModel.create(client);
  }
}
