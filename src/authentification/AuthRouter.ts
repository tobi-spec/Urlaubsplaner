import express, { NextFunction, Request, Response } from "express";
import passport from "passport";

const authRouter = express.Router();

authRouter.get("/login", function (req: Request, res: Response) {
  res.render("./views/login.ejs", { root: __dirname });
});

authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/calendar",
    failureRedirect: "/login?error=true",
    failureFlash: true
  })
);

authRouter.get("/login.css", function (req: Request, res: Response) {
  res.sendFile("./views/login.css", { root: __dirname + '/../'});
});

authRouter.get(
  "/logout",
  function (req: Request, res: Response, next: NextFunction) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  }
);

export default authRouter