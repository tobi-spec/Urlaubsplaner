import express, { Request, Response } from "express";

import passport from "passport";
//TODO: format import?
const initializePassport = require("./AuthService")


initializePassport(passport)

const router = express.Router()
router.use(passport.initialize());
router.use(passport.session());

  
router.get("/login", function (req: Request, res: Response) {
  res.render("./views/login.ejs", { root: __dirname });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/index",
  failureRedirect: "/login?error=true",
  failureFlash: true
}))

module.exports = router;