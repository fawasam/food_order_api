"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoute = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const controllers_1 = require("../controllers");
const app = express_1.default.Router();
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
