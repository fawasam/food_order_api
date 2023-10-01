import express, { Request, Response, NextFunction } from "express";
import {
  AddFood,
  AddOffer,
  EditOffer,
  GetCurrentOrders,
  GetFoods,
  GetOffers,
  GetOrderDetails,
  GetOrders,
  GetVendorProfile,
  ProcessOrder,
  UpdateVendorCoverImage,
  UpdateVendorProfile,
  UpdateVendorService,
  VendorLogin,
} from "../controllers";
import multer from "multer";
import { Authenticate } from "../middleware";

const app = express.Router();

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/images");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const images = multer({
  storage: imageStorage,
}).array("images", 10);

app.post("/login", VendorLogin);

app.use(Authenticate);
app.get("/profile", GetVendorProfile);
app.patch("/profile", UpdateVendorProfile);
app.patch("/coverimage", images, UpdateVendorCoverImage);
app.patch("/service", UpdateVendorService);

app.post("/food", images, AddFood);
app.get("/foods", GetFoods);

//orders
app.get("/orders", GetCurrentOrders);
app.put("/order/:id/process", ProcessOrder);
app.get("/order/:id", GetOrderDetails);

//Offers

app.get("/offers", GetOffers);
app.post("/offer", AddOffer);
app.put("/offer/:id", EditOffer);

export { app as VendorRoute };
