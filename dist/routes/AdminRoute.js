"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var app = express_1.default.Router();
exports.AdminRoute = app;
app.get("/", function (req, res) {
    res.json({ message: "Hello from Admin" });
});
//vendor
app.post("/vendor", controllers_1.CreateVandor);
app.get("/vendors", controllers_1.GetVandor);
app.post("/vendor/:id", controllers_1.GetVandorByID);
//Translation
app.get("/transactions", controllers_1.GetTransactions);
app.get("/transaction/:id", controllers_1.GetTransactionById);
//Delivery
app.put("/delivery/verify", controllers_1.VerifyDeliveryUser);
app.get("/delivery/users", controllers_1.GetDeliveryUsers);
//# sourceMappingURL=AdminRoute.js.map