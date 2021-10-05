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
const auth_1 = require("../middleware/auth");
const adminModel_1 = require("../models/adminModel");
exports.router = (0, express_1.Router)();
exports.router.get('/admin/all', auth_1.protectedRoute, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAdminUsers = yield adminModel_1.Admin.getAllAdminUsers();
        return res.json(allAdminUsers);
    }
    catch (error) {
        return next(error);
    }
}));
exports.router.get('/admin/:username', auth_1.protectedRoute, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        const getSingleAdmin = yield adminModel_1.Admin.getSingleAdminUser(username);
        return res.json(getSingleAdmin);
    }
    catch (error) {
        return next(error);
    }
}));
//# sourceMappingURL=adminRoutes.js.map