import express from "express";
import { Authenticate } from "../middleware";
import {
  DeliveryLogin,
  DeliverySignUp,
  EditDeliveryProfile,
  GetDeliveryProfile,
  UpdateDeliveryUserStatus,
} from "../controllers";

const app = express.Router();

app.post("/signup", DeliverySignUp);
app.post("/login", DeliveryLogin);
app.use(Authenticate);
app.put("/change-status", UpdateDeliveryUserStatus);
app.get("/profile", GetDeliveryProfile);
app.patch("/profile", EditDeliveryProfile);

export { app as DeliveryRoute };
