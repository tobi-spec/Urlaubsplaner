import express, { Request, Response } from "express";
import { EmployeeJSONAdapater } from "../src/EmployeeJSONAdapter";
import session from "express-session";
import passport from "passport";
import bcrypt from "bcrypt"
const LocalStrategy = require("passport-local").Strategy


const employeeJSONAdapater = new EmployeeJSONAdapater("./data/data.json")

let strategy = new LocalStrategy(
  async function(username:string, password:string, done) {
    let user;
    try {
      user = await employeeJSONAdapater.getEmployeeByName(username);
      if (!user) {
        return done(null, false, {message: 'No user by that name'});
      }
    } catch (e) {
      return done(e);
    }
    let match = await bcrypt.compare(password, user["passwort"], function(result) {
      if (!match) {
        console.log(password)
        console.log(user["passwort"])
        return done(null, false, {message: 'Not a matching password'});
      }
      return done(null, user);
  })
  }
);

const router = express.Router()
router.use(session({
    secret: "env.secret", // move to .env file
    resave: false,
    saveUninitialized: true
}))
router.use(express.json())
router.use(express.urlencoded({ extended: false }));
router.use(passport.initialize());
router.use(passport.session());
passport.use(strategy)

passport.serializeUser(function(user:Express.User, done) {
  done(null, user);
});

passport.deserializeUser(async (name:string, done) => {
    try {
      let user = await employeeJSONAdapater.getEmployeeByName(name);
      if (!user) {
        return done(new Error('user not found'));
      }
      done(null, user);
    } catch (e) {
      done(e);
    }
  });
  
router.get("/login", function (req: Request, res: Response) {
  res.sendFile("./static/login.html", { root: __dirname });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/index",
  failureRedirect: "/login?error=true",
}))

module.exports = router;