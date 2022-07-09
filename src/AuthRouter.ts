import express, { Request, Response } from "express";
import { createEmployee } from "./EmployeeJSONAdapter";
import bcrypt from "bcrypt";

const router = express.Router()


router.get("/register", function (req: Request, res: Response) {
    res.sendFile("./static/register.html", { root: __dirname });
  });
  
router.post("/register", async function (req: Request, res: Response) {
// if user created, if user already exists,
const hashedPassword = await bcrypt.hash(req.body.passwort, 10);
try {
    createEmployee(
    "./data/data.json",
    req.body.name,
    hashedPassword
    );
    res.redirect("/auth/login");
} catch {
    // display message why registry was not successfull
    res.redirect("/auth/register");
    }
  });
  
router.get("/login", function (req: Request, res: Response) {
res.sendFile("./static/login.html", { root: __dirname });
});

router.post("/login", function (req: Request, res: Response) {});

module.exports = router;