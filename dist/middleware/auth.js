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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoute = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const expressErrors_1 = require("../expressErrors");
const authenticateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //remember that authorization bearer header is in client  side?  Server only accesses it through req.headers
        const authHeader = req.headers['authorization'];
        const getBearerToken = authHeader.split(' ');
        const token = getBearerToken[1]; //["Bearer", "token"]
        const payload = yield jsonwebtoken_1.default.verify(token, config_1.SECRET_KEY);
        req.token = payload;
        console.log('Valid Token');
        return next();
    }
    catch (error) {
        console.log('No token boys');
        return next();
    }
});
exports.authenticateJWT = authenticateJWT;
const protectedRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.token) {
        return next(new expressErrors_1.ErrorNotAuthorized());
    }
    return next();
});
exports.protectedRoute = protectedRoute;
//req.headers.authorization has anything and split(' ')[0] has no "Bearer" on first word that's split
//# sourceMappingURL=auth.js.map