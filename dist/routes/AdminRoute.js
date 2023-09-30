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
app.post("/vendor", controllers_1.CreateVandor);
app.get("/vendors", controllers_1.GetVandor);
app.post("/vendor/:id", controllers_1.GetVandorByID);
app.get("/", function (req, res, next) {
    res.json({ message: "Hello from Admin" });
});
//# sourceMappingURL=AdminRoute.js.map