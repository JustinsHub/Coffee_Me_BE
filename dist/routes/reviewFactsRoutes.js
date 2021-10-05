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
const reviewFactsModel_1 = require("../models/reviewFactsModel");
exports.router = (0, express_1.Router)();
//put type for res,req,next and just import in future.
exports.router.get('/api/reviews/all', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readyForReviews = yield reviewFactsModel_1.Review.getAllReviews();
        return res.json(readyForReviews);
    }
    catch (error) {
        return next(error);
    }
}));
exports.router.get('/api/reviews/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const singleReview = yield reviewFactsModel_1.Review.getSingleReview(+id);
        return res.json(singleReview);
    }
    catch (error) {
        return next(error);
    }
}));
exports.router.post('/api/reviews/post', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fact } = req.body;
        const newFactPost = yield reviewFactsModel_1.Review.createCoffeeFact(fact);
        return res.status(201).json(newFactPost);
    }
    catch (error) {
        return next(error);
    }
}));
exports.router.patch('/api/reviews/:id/update', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { facts } = req.body; //specific to what we are editing. (add schema for validation)
        const updateReviewedFact = yield reviewFactsModel_1.Review.updateReviewFact(+id, facts);
        return res.status(201).json(updateReviewedFact);
    }
    catch (error) {
        return next(error);
    }
}));
exports.router.delete('/api/reviews/:id/delete', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield reviewFactsModel_1.Review.deleteReviewedFact(+id);
        return res.json({ review: "Successfully deleted." });
    }
    catch (error) {
        return next(error);
    }
}));
//# sourceMappingURL=reviewFactsRoutes.js.map