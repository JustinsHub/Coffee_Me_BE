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
const express_1 = require("express");
const expressErrors_1 = require("../expressErrors");
const coffeeFactsModel_1 = __importDefault(require("../models/coffeeFactsModel"));
const router = (0, express_1.Router)();
router.get('/api/facts', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coffeeFacts = yield coffeeFactsModel_1.default.getAllFacts();
        return res.json(coffeeFacts);
    }
    catch (error) {
        return next(error);
    }
}));
router.get('/api/facts/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const singleFact = yield coffeeFactsModel_1.default.getSingleFact(id);
        return res.json(singleFact);
    }
    catch (error) {
        return next(error);
    }
}));
router.post('/api/facts/:adminId/submit', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // this has to be posted by admin from review facts on approval TEST
    //make login authentication/authorization for admin
    //when the admin logs in and checks for approval, it request this api to post on coffee facts. 
    //when it posts it sends admin id back?
    try {
        const { adminId } = req.params;
        const { fact } = req.body; //change if needed when review facts applied
        const submitFact = yield coffeeFactsModel_1.default.approvedCoffeeFacts(fact, +adminId);
        return res.status(201).json(submitFact);
    }
    catch (error) {
        if (error.code === "P2003") { //Foreign Key constraint Prisma error
            return next(new expressErrors_1.ErrorNotAuthorized());
        }
        return next(error);
    }
    //create PATCH/DELETE? 
}));
exports.default = router;
//# sourceMappingURL=coffeeFactsRoutes.js.map