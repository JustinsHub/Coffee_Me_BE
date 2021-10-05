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
const client_1 = require(".prisma/client");
const expressErrors_1 = require("../expressErrors");
const { coffee_Facts } = new client_1.PrismaClient();
const Coffee = class {
    static getAllFacts() {
        return __awaiter(this, void 0, void 0, function* () {
            const allCoffeeFacts = yield coffee_Facts.findMany({
                select: {
                    coffee_facts: true
                }
            });
            return allCoffeeFacts;
        });
    }
    static getSingleFact(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const singleFact = yield coffee_Facts.findFirst({
                where: {
                    id: +id //<-- needs to be an integer to look into DB (string in API parameter)
                },
                select: {
                    coffee_facts: true
                }
            });
            if (singleFact) {
                return singleFact;
            }
            throw new expressErrors_1.ErrorNotFound();
        });
    }
    static approvedCoffeeFacts(fact, adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminUser = yield coffee_Facts.findUnique({
                where: {
                    id: adminId,
                }
            });
            if (!adminUser) {
                throw new expressErrors_1.ErrorNotAuthorized();
            }
            const approvedCoffeeFact = yield coffee_Facts.create({
                data: {
                    coffee_facts: fact,
                    admin_id: adminId
                },
                select: {
                    coffee_facts: true
                }
            });
            return approvedCoffeeFact;
        });
    }
};
exports.default = Coffee;
//# sourceMappingURL=coffeeFactsModel.js.map