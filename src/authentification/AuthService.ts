import { JsonAdapater } from "../JsonAdapter";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";

const jsonAdapater = new JsonAdapater("./data/employees.json");

export const strategy = new LocalStrategy(async function (
  username: string,
  password: string,
  done
) {
  try {
    let user;
    user = await getEmployeeByName(username);
    if (user) {
      let match = await bcrypt.compare(password, user["passwort"]);
      if (match) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: "username or password is incorrect"
        });
      }
    } else {
      return done(null, false, {
        message: "username or password is incorrect"
      });
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
    let user = getEmployeeByName(name);
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

const getEmployeeByName = async (wantedName: string) => {
  const names: string[] =
    jsonAdapater.getJSONDataByExpression("employees.name");
  const position = names.indexOf(wantedName);
  if (position === -1) {
    return null;
  } else {
    return jsonAdapater.getJSONDataByExpression(`employees[${position}]`);
  }
};
