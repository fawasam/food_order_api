import express, { Request, Response, NextFunction } from "express";
import {
  GetTransactionById,
  CreateVandor,
  GetTransactions,
  GetVandor,
  GetVandorByID,
  VerifyDeliveryUser,
  GetDeliveryUsers,
} from "../controllers";

const app = express.Router();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Admin" });
});

//vendor
app.post("/vendor", CreateVandor);
app.get("/vendors", GetVandor);
app.post("/vendor/:id", GetVandorByID);

//Translation
app.get("/transactions", GetTransactions);
app.get("/transaction/:id", GetTransactionById);

//Delivery
app.put("/delivery/verify", VerifyDeliveryUser);
app.get("/delivery/users", GetDeliveryUsers);

export { app as AdminRoute };
