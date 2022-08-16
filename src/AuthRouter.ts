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

router.get("/login.css",  function (req: Request, res: Response) {
  res.sendFile("/views/login.css", { root: __dirname });
});

module.exports = router;
