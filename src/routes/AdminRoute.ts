import express, { Request, Response, NextFunction } from "express";
import { CreateVandor, GetVandor, GetVandorByID } from "../controllers";

const app = express.Router();

app.post("/vendor", CreateVandor);
app.get("/vendors", GetVandor);
app.post("/vendor/:id", GetVandorByID);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from Admin" });
});

export { app as AdminRoute };
