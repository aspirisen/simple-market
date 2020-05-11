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
      name: "Soup",
      kind: "SOUP",
      price: 0.65,
      imageUrl:
        "https://www.dailyherald.com/storyimage/DA/20171227/ENTLIFE/171229429/AR/0/AR-171229429.jpg&amp;updated=201712260926&amp;imageversion=Facebook&amp;exactH=630&amp;exactW=1200&amp;exactfit=crop&amp;noborder",
    });

    const bread = new Product({
      name: "Bread",
      kind: "BREAD",
      price: 0.8,
      imageUrl:
        "https://avatars.mds.yandex.net/get-pdb/2058232/0eaaa8bd-b5f1-4132-b1f6-2d66d52996fb/s1200?webp=false",
    });
    const milk = new Product({
      name: "Milk",
      kind: "MILK",
      price: 1.3,
      imageUrl:
        "https://avatars.mds.yandex.net/get-pdb/1551693/694aec39-902a-40d3-9ab3-7a74822bb438/s1200?webp=false",
    });

    const apple = new Product({
      name: "Apple",
      kind: "APPLE",
      price: 1,
      imageUrl: "https://99px.ru/sstorage/53/2016/09/tmb_177842_9478.jpg",
    });

    await ProductModel.create(soup, bread, milk, apple);
  }
}
