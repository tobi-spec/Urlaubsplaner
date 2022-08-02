import express, { Request, Response } from "express";
import session from "express-session";
import passport from "passport";
//TODO: format import?
const initializePassport = require("./AuthService")


const sessionParams = {
  secret: "env.secret", // move to .env file
  resave: false,
  saveUninitialized: true
}

initializePassport(passport)

const router = express.Router()
router.use(session(sessionParams))
router.use(express.json())
router.use(express.urlencoded({ extended: false }));
router.use(passport.initialize());
router.use(passport.session());

  
router.get("/login", function (req: Request, res: Response) {
  res.sendFile("./static/login.html", { root: __dirname });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/index",
  failureRedirect: "/login?error=true",
}))

module.exports = router;