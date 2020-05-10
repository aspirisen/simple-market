import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import connectMongo from "connect-mongo";
import passport from "passport";
import { Strategy } from "passport-local";
import { UserModel, User } from "server/models/User";
import { UsersController } from "server/controllers";
import { NewUser } from "server/controllers/UsersController/inputs/NewUser";

export class Auth {
  constructor(private exp: express.Express) {}

  public populate(serverSideRendering: express.RequestHandler) {
    passport.use(
      new Strategy((email, password, done) => {
        UserModel.findOne({ email }, (err, user) => {
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false);
          }

          if (!user.verifyPassword(password)) {
            return done(new Error("Incorrect credentials"));
          }

          return done(null, user);
        });
      })
    );

    passport.serializeUser((user: User, cb) => {
      cb(null, user.email);
    });

    passport.deserializeUser((email: string, cb) => {
      UserModel.findOne({ email }).exec((err, user) => {
        if (err) {
          return cb(err);
        }

        return cb(null, user);
      });
    });

    const MongoStore = connectMongo(session);

    this.exp.use(
      session({
        secret: "my super secret",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
      })
    );

    this.exp.use(passport.initialize());
    this.exp.use(passport.session());

    this.exp.all<NewUser & Record<string, string>>(
      "/signup",
      async (req, res, next) => {
        if (req.params.email && req.params.name && req.params.password) {
          const userController = new UsersController();
          userController.addUser(req.params);
          res.redirect(req.session?.returnTo || "/");
        } else {
          serverSideRendering(req, res, next);
        }
      }
    );

    this.exp.all("/login", (req, res, next) => {
      passport.authenticate("local", (err, user) => {
        if (err) {
          next(err);
        }

        if (!user) {
          serverSideRendering(req, res, next);
        } else {
          req.logIn(user, (logErr) => {
            if (logErr) {
              return next(logErr);
            }

            return res.redirect(req.session?.returnTo || "/");
          });
        }
      })(req, res, next);
    });

    this.exp.all("/logout", (req, res) => {
      req.logout();
      res.redirect("/");
    });
  }
}
