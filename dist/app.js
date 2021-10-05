"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const coffeeFactsRoutes_1 = __importDefault(require("./routes/coffeeFactsRoutes"));
const reviewFactsRoutes_1 = require("./routes/reviewFactsRoutes");
const rejectedFactsRoutes_1 = require("./routes/rejectedFactsRoutes");
const adminRoutes_1 = require("./routes/adminRoutes");
const adminAuthRoutes_1 = require("./routes/adminAuthRoutes");
const expressErrors_1 = require("./expressErrors");
const auth_1 = require("./middleware/auth");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(auth_1.authenticateJWT);
app.use('/coffee', coffeeFactsRoutes_1.default);
app.use('/', reviewFactsRoutes_1.router);
app.use('/', rejectedFactsRoutes_1.router);
app.use('/', adminRoutes_1.router);
app.use('/', adminAuthRoutes_1.router);
app.use(expressErrors_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map