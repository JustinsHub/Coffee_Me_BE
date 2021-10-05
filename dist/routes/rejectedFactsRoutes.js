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
const rejectedFactsModel_1 = require("../models/rejectedFactsModel");
exports.router = (0, express_1.Router)();
exports.router.get('/api/rejected/all', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRejectedFacts = yield rejectedFactsModel_1.RejectedFact.getAllRejectedFacts();
        return res.json(allRejectedFacts);
    }
    catch (error) {
        return next(error);
    }
}));
exports.router.get('/api/rejected/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const singleRejectedFact = yield rejectedFactsModel_1.RejectedFact.getSingleRejectedFact(id);
        return res.json(singleRejectedFact);
    }
    catch (error) {
        return next(error);
    }
}));
exports.router.post('/api/rejected/:adminId/fact', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminId } = req.params;
        const { fact } = req.body;
        const rejectedFact = yield rejectedFactsModel_1.RejectedFact.rejectedCoffeeFact(fact, +adminId);
        return res.status(201).json(rejectedFact);
    }
    catch (error) {
        return next(error);
    }
}));
//# sourceMappingURL=rejectedFactsRoutes.js.map