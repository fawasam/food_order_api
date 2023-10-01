import express, { Request, Response, NextFunction } from "express";

import { Authenticate } from "../middleware";
import {
  AddToCart,
  CreateOrder,
  CreatePayment,
  CustomerLogin,
  CustomerSignUp,
  CustomerVerify,
  DeleteCart,
  EditCustomerProfile,
  GetCart,
  GetCustomerProfile,
  GetOrderById,
  GetOrders,
  RequestOtp,
  VerifyOffer,
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
app.post("/cart", AddToCart);
app.get("/cart", GetCart);
app.delete("/cart", DeleteCart);

//Apply Offers
app.get("/offer/verify/:id", VerifyOffer);

//order
app.post("/create-order", CreateOrder);
app.get("/orders", GetOrders);
app.get("/order/:id", GetOrderById);

//payment
app.post("/create-payment", CreatePayment);

export { app as CustomerRoute };
