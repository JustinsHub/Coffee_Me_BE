const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR || 12

const SECRET_KEY = process.env.SECRET_KEY || "somesecretkey;)"

export {
    SECRET_KEY,
    BCRYPT_WORK_FACTOR
}