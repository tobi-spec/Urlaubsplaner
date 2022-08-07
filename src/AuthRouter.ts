import express, { Request, Response } from "express";
import passport from "passport";

const router = express.Router();

router.get("/login", function (req: Request, res: Response) {
  res.render("./views/login.ejs", { root: __dirname });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login?error=true",
    failureFlash: true
  })
);

module.exports = router;
