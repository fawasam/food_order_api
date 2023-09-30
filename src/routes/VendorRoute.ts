import express, { Request, Response, NextFunction } from "express";
import {
  AddFood,
  GetFoods,
  GetVendorProfile,
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
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const images = multer({ storage: imageStorage }).array("images", 10);

app.post("/login", VendorLogin);

app.use(Authenticate);
app.get("/profile", GetVendorProfile);
app.patch("/profile", UpdateVendorProfile);
app.patch("/coverimage", images, UpdateVendorCoverImage);
app.patch("/service", UpdateVendorService);

app.post("/food", images, AddFood);
app.get("/foods", GetFoods);

export { app as VendorRoute };
