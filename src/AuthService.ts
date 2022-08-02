const LocalStrategy = require("passport-local").Strategy
import { EmployeeJSONAdapater } from "../src/EmployeeJSONAdapter";
import bcrypt from "bcrypt"

const employeeJSONAdapater = new EmployeeJSONAdapater("./data/data.json")

const strategy = new LocalStrategy(
  async function(username:string, password:string, done) {
    try {
      let user;
      user = await employeeJSONAdapater.getEmployeeByName(username);
      if(user) {
        let match = await bcrypt.compare(password, user["passwort"])
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Username or password wrong'});
        }
      } else {
        return done(null, false, {message: 'Username or password wrong'});
      }
    }catch(err) {
      done(err, null) 
    }
  })


const serializerFunction = (user:Express.User, done) => {
  done(null, user);
}

const deserializerFunction = async(name:string, done) => {
  try {
    let user = await employeeJSONAdapater.getEmployeeByName(name);
    if (!user) {
      return done(new Error('user not found'));
    }
    done(null, user);
  } catch (e) {
    done(e);
  }
}

function initializePassport(passport) {
    passport.use(strategy)
    passport.serializeUser(serializerFunction);
    passport.deserializeUser(deserializerFunction)
}

module.exports = initializePassport;