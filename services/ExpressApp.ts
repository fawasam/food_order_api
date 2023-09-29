import express, { Application } from "express";
import path from "path";
import { AdminRoute, VendorRoute } from "../routes";

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const imagePath = path.join(__dirname, "../images");
  app.use("/images", express.static(imagePath));

  app.use("/admin", AdminRoute);
  app.use("/vendor", VendorRoute);
  return app;
};
