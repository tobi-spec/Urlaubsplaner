import express, { Request, Response } from "express";

const router = express.Router()
  
router.get("/login", function (req: Request, res: Response) {
res.sendFile("./static/login.html", { root: __dirname });
});

router.post("/login", function (req: Request, res: Response) {});

module.exports = router;