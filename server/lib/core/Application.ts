import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { ensureLoggedIn } from "connect-ensure-login";
import { Auth } from "./Auth";
import { DB, DbConfig } from "./DB";
import { GraphQL } from "./GraphQL";

export class Application {
  public exp = express();

  private db = new DB(this.dbConfig);

  private auth = new Auth(this.exp);

  public graphql = new GraphQL(this.exp);

  public constructor(private dbConfig: DbConfig) {}

  public async populate(serverSideRendering: express.RequestHandler) {
    this.exp.use(bodyParser.json({ type: ["application/json", "text/plain"] }));
    this.exp.use(bodyParser.urlencoded({ extended: true }));
    this.exp.use(cookieParser());

    this.exp.get("/favicon.ico", (_, res) => res.end());

    await this.db.populate();
    await this.auth.populate(serverSideRendering);

    this.exp.use(ensureLoggedIn({ redirectTo: "/login" }));

    await this.graphql.populate();

    this.exp.use(serverSideRendering);
  }
}
