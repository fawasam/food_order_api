import express, { Request, Response, NextFunction } from "express";
import {
  GetAvailableOffers,
  GetFoodAvailability,
  GetFoodsIn30Min,
  GetTopRestaurants,
  RestaurantById,
  SearchFoods,
} from "../controllers";

const app = express.Router();

/* ------------------- Food Availability --------------------- */
app.get("/:pincode", GetFoodAvailability);

/* ------------------- Top Restaurant --------------------- */
app.get("/top-restaurant/:pincode", GetTopRestaurants);

/* ------------------- Food Available in 30 Minutes --------------------- */
app.get("/foods-in-30-min/:pincode", GetFoodsIn30Min);

/* ------------------- Search Foods --------------------- */
app.get("/search/:pincode", SearchFoods);

/* ------------------- Search Offers --------------------- */
app.get("/offers/:pincode", GetAvailableOffers);

/* ------------------- Find Restaurant by ID --------------------- */
app.get("/restaurant/:id", RestaurantById);

export { app as ShoppingRoute };
