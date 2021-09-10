import dotenv from 'dotenv'
dotenv.config()

export const getDatabaseURI = ():string => {
    return (process.env.NODE_ENV === "test") ? "Coffee_Me_test" : process.env.DATABASE_URL || "Coffee_Me"
}

