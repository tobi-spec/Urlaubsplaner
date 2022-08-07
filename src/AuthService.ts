import { EmployeeJSONAdapater } from "../src/EmployeeJSONAdapter";
import bcrypt from "bcrypt";
//TODO: format import?
const LocalStrategy = require("passport-local").Strategy;

const employeeJSONAdapater = new EmployeeJSONAdapater("./data/data.json");

export const strategy = new LocalStrategy(async function (
  username: string,
  password: string,
  done
) {
  try {
    let user;
    user = await employeeJSONAdapater.getEmployeeByName(username);
    if (user) {
      let match = await bcrypt.compare(password, user["passwort"]);
      if (match) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Username or password wrong" });
      }
    } else {
      return done(null, false, { message: "Username or password wrong" });
    }
  } catch (err) {
    done(err, null);
  }
});

export const serializerFunction = (user: Express.User, done) => {
  done(null, user);
};

export const deserializerFunction = (name: string, done) => {
  try {
    let user = employeeJSONAdapater.getEmployeeByName(name);
    if (!user) {
      return done(new Error("user not found"));
    }
    done(null, user);
  } catch (e) {
    done(e);
  }
};

export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render("./views/login.ejs", { root: __dirname });
  }
};
