"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCustomerProfile = exports.GetCustomerProfile = exports.RequestOtp = exports.CustomerVerify = exports.CustomerLogin = exports.CustomerSignUp = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dto_1 = require("../dto");
const utility_1 = require("../utility");
const models_1 = require("../models");
const CustomerSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerInputs = (0, class_transformer_1.plainToClass)(dto_1.CreateCustomerInput, req.body);
    const validationError = yield (0, class_validator_1.validate)(customerInputs, {
        validationError: { target: true },
    });
    if (validationError.length > 0) {
        return res.status(400).json(validationError);
    }
    const { email, phone, password } = customerInputs;
    const salt = yield (0, utility_1.GenerateSalt)();
    const userPassword = yield (0, utility_1.GeneratePassword)(password, salt);
    const { otp, expiry } = (0, utility_1.GenerateOtp)();
    const existingCustomer = yield models_1.Customer.find({ email: email });
    //   console.log(existingCustomer);
    if (existingCustomer == null) {
        return res.status(400).json({ message: "Email already exist!" });
    }
    const result = yield models_1.Customer.create({
        email: email,
        password: userPassword,
        salt: salt,
        phone: phone,
        otp: otp,
        otp_expiry: expiry,
        firstName: "",
        lastName: "",
        address: "",
        verified: false,
        lat: 0,
        lng: 0,
        orders: [],
    });
    if (result) {
        // send OTP to customer
        yield (0, utility_1.onRequestOTP)(otp, phone);
        //Generate the Signature
        const signature = yield (0, utility_1.GenerateSignature)({
            _id: result._id,
            email: result.email,
            verified: result.verified,
        });
        // Send the result
        return res
            .status(201)
            .json({ signature, verified: result.verified, email: result.email });
    }
    return res.status(400).json({ msg: "Error while creating user" });
});
exports.CustomerSignUp = CustomerSignUp;
const CustomerLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerInputs = (0, class_transformer_1.plainToClass)(dto_1.UserLoginInput, req.body);
    const validationError = yield (0, class_validator_1.validate)(customerInputs, {
        validationError: { target: true },
    });
    if (validationError.length > 0) {
        return res.status(400).json(validationError);
    }
    const { email, password } = customerInputs;
    const customer = yield models_1.Customer.findOne({ email: email });
    if (customer) {
        const validation = yield (0, utility_1.ValidatePassword)(password, customer.password, customer.salt);
        if (validation) {
            const signature = yield (0, utility_1.GenerateSignature)({
                _id: customer._id,
                email: customer.email,
                verified: customer.verified,
            });
            return res.status(200).json({
                signature,
                email: customer.email,
                verified: customer.verified,
            });
        }
    }
    return res.json({ msg: "Error With Signup" });
});
exports.CustomerLogin = CustomerLogin;
const CustomerVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    const customer = req.user;
    if (customer) {
        const profile = yield models_1.Customer.findById(customer._id);
        if (profile) {
            if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
                profile.verified = true;
                const updatedCustomerResponse = yield profile.save();
                const signature = yield (0, utility_1.GenerateSignature)({
                    _id: updatedCustomerResponse._id,
                    email: updatedCustomerResponse.email,
                    verified: updatedCustomerResponse.verified,
                });
                return res.status(200).json({
                    signature,
                    email: updatedCustomerResponse.email,
                    verified: updatedCustomerResponse.verified,
                });
            }
        }
    }
    return res.status(400).json({ msg: "Unable to verify Customer" });
});
exports.CustomerVerify = CustomerVerify;
const RequestOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield models_1.Customer.findById(customer._id);
        if ((profile === null || profile === void 0 ? void 0 : profile.verified) === true)
            return res.status(200).json({ message: "User already verified" });
        if (profile) {
            const { otp, expiry } = (0, utility_1.GenerateOtp)();
            profile.otp = otp;
            profile.otp_expiry = expiry;
            yield profile.save();
            const sendCode = yield (0, utility_1.onRequestOTP)(otp, profile.phone);
            if (!sendCode) {
                return res
                    .status(400)
                    .json({ message: "Failed to verify your phone number" });
            }
            return res
                .status(200)
                .json({ message: "OTP sent to your registered Mobile Number!" });
        }
    }
    return res.status(400).json({ msg: "Error with Requesting OTP" });
});
exports.RequestOtp = RequestOtp;
const GetCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield models_1.Customer.findById(customer._id);
        if (profile) {
            return res.status(201).json(profile);
        }
    }
    return res.status(400).json({ msg: "Error while Fetching Profile" });
});
exports.GetCustomerProfile = GetCustomerProfile;
const EditCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    const customerInputs = (0, class_transformer_1.plainToClass)(dto_1.EditCustomerProfileInput, req.body);
    const validationError = yield (0, class_validator_1.validate)(customerInputs, {
        validationError: { target: true },
    });
    if (validationError.length > 0) {
        return res.status(400).json(validationError);
    }
    const { firstName, lastName, address } = customerInputs;
    if (customer) {
        const profile = yield models_1.Customer.findById(customer._id);
        if (profile) {
            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.address = address;
            const result = yield profile.save();
            return res.status(201).json(result);
        }
    }
    return res.status(400).json({ msg: "Error while Updating Profile" });
});
exports.EditCustomerProfile = EditCustomerProfile;
