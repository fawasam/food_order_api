"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryRoute = void 0;
var express_1 = __importDefault(require("express"));
var middleware_1 = require("../middleware");
var controllers_1 = require("../controllers");
var app = express_1.default.Router();
exports.DeliveryRoute = app;
app.post("/signup", controllers_1.DeliverySignUp);
app.post("/login", controllers_1.DeliveryLogin);
app.use(middleware_1.Authenticate);
app.put("/change-status", controllers_1.UpdateDeliveryUserStatus);
app.get("/profile", controllers_1.GetDeliveryProfile);
app.patch("/profile", controllers_1.EditDeliveryProfile);
//# sourceMappingURL=DeliveryRoute.js.map