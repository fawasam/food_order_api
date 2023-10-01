"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoute = void 0;
var express_1 = __importDefault(require("express"));
var middleware_1 = require("../middleware");
var controllers_1 = require("../controllers");
var app = express_1.default.Router();
exports.CustomerRoute = app;
/* ------------------- Suignup / Create Customer --------------------- */
app.post("/signup", controllers_1.CustomerSignUp);
/* ------------------- Login --------------------- */
app.post("/login", controllers_1.CustomerLogin);
/* ------------------- Authentication --------------------- */
app.use(middleware_1.Authenticate);
/* ------------------- Verify Customer Account --------------------- */
app.patch("/verify", controllers_1.CustomerVerify);
/* ------------------- OTP / request OTP --------------------- */
app.get("/otp", controllers_1.RequestOtp);
/* ------------------- Profile --------------------- */
app.get("/profile", controllers_1.GetCustomerProfile);
app.patch("/profile", controllers_1.EditCustomerProfile);
//cart
app.post("/cart", controllers_1.AddToCart);
app.get("/cart", controllers_1.GetCart);
app.delete("/cart", controllers_1.DeleteCart);
//Apply Offers
app.get("/offer/verify/:id", controllers_1.VerifyOffer);
//order
app.post("/create-order", controllers_1.CreateOrder);
app.get("/orders", controllers_1.GetOrders);
app.get("/order/:id", controllers_1.GetOrderById);
//payment
app.post("/create-payment", controllers_1.CreatePayment);
//# sourceMappingURL=CustomerRoute.js.map