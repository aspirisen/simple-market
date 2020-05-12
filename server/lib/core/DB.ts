import mongoose from "mongoose";
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
    const hasBeenInitialized = await ProductModel.findOne({});

    if (hasBeenInitialized) {
      return;
    }

    const soup = new Product({
      name: "Goroh",
      kind: "SOUP",
      price: 0.65,
      imageUrl: "https://lmm.in.ua/photo_opisanie/6685/1558965119-3561.jpeg",
    });

    const bread = new Product({
      name: "Borodino",
      kind: "BREAD",
      price: 0.8,
      imageUrl:
        "https://bolshoi67.ru/upload/iblock/f11/f11251d10ef39077fb88a9b44e728726.jpeg",
    });
    const milk = new Product({
      name: "Amka",
      kind: "MILK",
      price: 1.3,
      imageUrl:
        "https://cdntwo.abloomnova.net/wp-content/uploads/2017/01/calcium-in-milk-abloomnova.net_.jpg",
    });

    const apple = new Product({
      name: "Antonovka",
      kind: "APPLE",
      price: 1,
      imageUrl:
        "https://edinstvennaya.ua/storage/shares/uploads/files/yabloki-frukty-narezannye.jpg",
    });

    await ProductModel.create(soup, bread, milk, apple);
  }
}
