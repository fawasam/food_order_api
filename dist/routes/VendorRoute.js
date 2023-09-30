"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRoute = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var multer_1 = __importDefault(require("multer"));
var middleware_1 = require("../middleware");
var app = express_1.default.Router();
exports.VendorRoute = app;
var imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    },
});
var images = (0, multer_1.default)({ storage: imageStorage }).array("images", 10);
app.post("/login", controllers_1.VendorLogin);
app.use(middleware_1.Authenticate);
app.get("/profile", controllers_1.GetVendorProfile);
app.patch("/profile", controllers_1.UpdateVendorProfile);
app.patch("/coverimage", images, controllers_1.UpdateVendorCoverImage);
app.patch("/service", controllers_1.UpdateVendorService);
app.post("/food", images, controllers_1.AddFood);
app.get("/foods", controllers_1.GetFoods);
//# sourceMappingURL=VendorRoute.js.map