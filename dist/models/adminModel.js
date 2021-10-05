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
exports.Admin = void 0;
const client_1 = require(".prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const expressErrors_1 = require("../expressErrors");
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { admin } = new client_1.PrismaClient();
const Admin = class {
    static getAllAdminUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const allAdminUsers = yield admin.findMany({
                select: {
                    id: true,
                    username: true,
                    admin_only: true,
                    created_on: true
                }
            });
            return allAdminUsers;
        });
    }
    static getSingleAdminUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const singleAdminUser = yield admin.findUnique({
                where: {
                    username
                },
                select: {
                    id: true,
                    username: true,
                    created_on: true
                }
            });
            if (singleAdminUser) {
                return singleAdminUser;
            }
            throw new expressErrors_1.ErrorNotFound();
        });
    }
    static registerAdminUser(username, password, isAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminUsername = yield admin.findUnique({
                where: {
                    username
                }
            });
            //Finding duplicate usernames
            if (adminUsername) {
                throw new expressErrors_1.ErrorBadRequest("Username already taken.");
            }
            const bcryptWorkFactor = config_1.BCRYPT_WORK_FACTOR;
            const hashedPassword = yield bcrypt_1.default.hash(password, +bcryptWorkFactor);
            const registerNewAdmin = yield admin.create({
                data: {
                    username,
                    password: hashedPassword,
                    admin_only: isAdmin
                }
            });
            return registerNewAdmin;
        });
    }
    static loginAdminUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginAdmin = yield admin.findUnique({
                where: {
                    username
                },
                select: {
                    id: true
                }
            });
            const adminPassword = yield admin.findUnique({
                where: {
                    username,
                },
                select: {
                    password: true
                }
            });
            const adminBcrypt = yield bcrypt_1.default.compare(password, adminPassword === null || adminPassword === void 0 ? void 0 : adminPassword.password);
            if (adminBcrypt) {
                const token = jsonwebtoken_1.default.sign({ id: loginAdmin === null || loginAdmin === void 0 ? void 0 : loginAdmin.id }, config_1.SECRET_KEY);
                return { accessToken: token };
            }
            throw new expressErrors_1.ErrorNotAuthorized('Invalid Credentials');
        });
    }
};
exports.Admin = Admin;
//# sourceMappingURL=adminModel.js.map