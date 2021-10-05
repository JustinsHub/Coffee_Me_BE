"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BCRYPT_WORK_FACTOR = exports.SECRET_KEY = void 0;
const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR || 12;
exports.BCRYPT_WORK_FACTOR = BCRYPT_WORK_FACTOR;
const SECRET_KEY = process.env.SECRET_KEY || "somesecretkey;)";
exports.SECRET_KEY = SECRET_KEY;
//# sourceMappingURL=config.js.map