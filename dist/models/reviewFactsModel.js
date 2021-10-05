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
exports.Review = void 0;
const client_1 = require("@prisma/client");
const expressErrors_1 = require("../expressErrors");
const { review_Facts } = new client_1.PrismaClient();
const Review = class {
    static getAllReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            const coffeeReviews = yield review_Facts.findMany({
                select: {
                    id: true,
                    review_facts: true
                }
            });
            return coffeeReviews;
        });
    }
    static getSingleReview(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviewID = yield review_Facts.findUnique({
                where: {
                    id: id
                }
            });
            if (!reviewID) {
                throw new expressErrors_1.ErrorNotFound();
            }
            const singleReview = yield review_Facts.findFirst({
                where: {
                    id: +id
                },
                select: {
                    review_facts: true,
                    id: true
                }
            });
            return singleReview;
        });
    }
    static createCoffeeFact(fact) {
        return __awaiter(this, void 0, void 0, function* () {
            //error handle, needs to be string
            const newCoffeeFact = yield review_Facts.create({
                data: {
                    review_facts: fact
                }
            });
            return newCoffeeFact;
        });
    }
    static updateReviewFact(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviewID = yield review_Facts.findUnique({
                where: {
                    id: id
                }
            });
            const reviewFact = yield review_Facts.update({
                where: {
                    id: id
                },
                //this is specific to the update if casting an object. Can just add req.body as data and can edit (add validator if so)
                data: {
                    review_facts: data
                }
            });
            if (reviewID) {
                return reviewFact;
            }
            throw new expressErrors_1.ErrorNotFound();
            //add error handling on duplicate ids?
            //id missing
        });
    }
    static deleteReviewedFact(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviewFactID = yield review_Facts.findUnique({
                where: {
                    id
                }
            });
            if (!reviewFactID) {
                throw new expressErrors_1.ErrorNotFound();
            }
            const reviewedFact = yield review_Facts.delete({
                where: {
                    id
                }
            });
            return reviewedFact;
        });
    }
};
exports.Review = Review;
//# sourceMappingURL=reviewFactsModel.js.map