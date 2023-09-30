"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCustomerProfileInput = exports.UserLoginInput = exports.CreateCustomerInput = void 0;
const class_validator_1 = require("class-validator");
class CreateCustomerInput {
}
exports.CreateCustomerInput = CreateCustomerInput;
__decorate([
    (0, class_validator_1.IsEmail)()
], CreateCustomerInput.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Length)(7, 12)
], CreateCustomerInput.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.Length)(6, 12)
], CreateCustomerInput.prototype, "password", void 0);
class UserLoginInput {
}
exports.UserLoginInput = UserLoginInput;
__decorate([
    (0, class_validator_1.IsEmail)()
], UserLoginInput.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Length)(6, 12)
], UserLoginInput.prototype, "password", void 0);
class EditCustomerProfileInput {
}
exports.EditCustomerProfileInput = EditCustomerProfileInput;
__decorate([
    (0, class_validator_1.Length)(3, 16)
], EditCustomerProfileInput.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.Length)(3, 16)
], EditCustomerProfileInput.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.Length)(6, 16)
], EditCustomerProfileInput.prototype, "address", void 0);
