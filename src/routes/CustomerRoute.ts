import express, { Request, Response, NextFunction } from "express";

import { Authenticate } from "../middleware";
import {
  CustomerLogin,
  CustomerSignUp,
  CustomerVerify,
  EditCustomerProfile,
  GetCustomerProfile,
  RequestOtp,
} from "../controllers";
const app = express.Router();

/* ------------------- Suignup / Create Customer --------------------- */
app.post("/signup", CustomerSignUp);

/* ------------------- Login --------------------- */
app.post("/login", CustomerLogin);

/* ------------------- Authentication --------------------- */
app.use(Authenticate);

/* ------------------- Verify Customer Account --------------------- */
app.patch("/verify", CustomerVerify);

/* ------------------- OTP / request OTP --------------------- */
app.get("/otp", RequestOtp);

/* ------------------- Profile --------------------- */
app.get("/profile", GetCustomerProfile);
app.patch("/profile", EditCustomerProfile);

//cart
//order
//payment

export { app as CustomerRoute };
