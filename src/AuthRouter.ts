import express, { Request, Response } from "express";
import { EmployeeJSONAdapater } from "../src/EmployeeJSONAdapter";
import session from "express-session";
import passport from "passport";
import bcrypt from "bcrypt"
const LocalStrategy = require("passport-local").Strategy


const employeeJSONAdapater = new EmployeeJSONAdapater("./data/data.json")

const router = express.Router()
router.use(session({
    secret: "env.secret", // move to .env file
    resave: false,
    saveUninitialized: true
}))
router.use(express.urlencoded({ extended: false }));
router.use(passport.initialize());
router.use(passport.session());


let strategy = new LocalStrategy(
    async function(name:string, password:string, done) {
      let user;
      try {
        user = await employeeJSONAdapater.getEmployeeByName(name);
        console.log(user)
        if (!user) {
          return done(null, false, {message: 'No user by that name'});
        }
      } catch (e) {
        return done(e);
      }
      let match = bcrypt.compare(password, user[1])
      console.log(match)
      if (!match) {
        return done(null, false, {message: 'Not a matching password'});
      }
      return done(null, user);
    }
  );

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