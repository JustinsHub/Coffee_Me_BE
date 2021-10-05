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
exports.RejectedFact = void 0;
const client_1 = require(".prisma/client");
const expressErrors_1 = require("../expressErrors");
const { rejected_Facts } = new client_1.PrismaClient();
const RejectedFact = class {
    static getAllRejectedFacts() {
        return __awaiter(this, void 0, void 0, function* () {
            const allRejectedFacts = yield rejected_Facts.findMany({
                select: {
                    id: true,
                    rejected_facts: true
                }
            });
            return allRejectedFacts;
        });
    }
    static getSingleRejectedFact(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rejectedFactID = yield rejected_Facts.findUnique({
                where: {
                    id: +id
                }
            });
            const singleRejectedFact = yield rejected_Facts.findFirst({
                where: {
                    id: +id
                },
                select: {
                    id: true,
                    rejected_facts: true
                }
            });
            if (rejectedFactID) {
                return singleRejectedFact;
            }
            throw new expressErrors_1.ErrorNotFound();
        });
    }
    static rejectedCoffeeFact(fact, adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminUser = yield rejected_Facts.findUnique({
                where: {
                    id: adminId
                }
            });
            const rejectedFact = yield rejected_Facts.create({
                data: {
                    rejected_facts: fact,
                    admin_id: adminId
                }
            });
            if (adminUser) {
                return rejectedFact;
            }
            throw new expressErrors_1.ErrorNotAuthorized();
        });
    }
};
exports.RejectedFact = RejectedFact;
//# sourceMappingURL=rejectedFactsModel.js.map