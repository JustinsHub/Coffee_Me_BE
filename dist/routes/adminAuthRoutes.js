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
exports.router = void 0;
const express_1 = require("express");
const adminModel_1 = require("../models/adminModel");
exports.router = (0, express_1.Router)();
exports.router.post('/admin/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAdmin = true; //find out how to make someone an admin?
        const { username, password } = req.body;
        const registerAdmin = yield adminModel_1.Admin.registerAdminUser(username, password, isAdmin); // add jwt?
        if (isAdmin) {
            return res.status(201).json(registerAdmin);
        }
    }
    catch (error) {
        return next(error);
    }
}));
exports.router.post('/admin/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const adminLogin = yield adminModel_1.Admin.loginAdminUser(username, password); //add jwt?
        return res.status(201).json(adminLogin);
    }
    catch (error) {
        return next(error);
    }
}));
//# sourceMappingURL=adminAuthRoutes.js.map