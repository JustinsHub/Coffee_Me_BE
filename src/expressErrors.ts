import { ErrorRequestHandler} from './interfaces/errorType'

export const errorHandler:ErrorRequestHandler = (error, req, res, next) => {
    let status:number = error.status || 500
    let message:string = error.message
    return res.status(status).json({
        error: {message, status}
    })
}
export class ExpressError extends Error {
    message: string;
    status: number
    constructor(message: string, status: number){
        super();
        this.message = message;
        this.status = status
        console.log(this.stack)
    }
}

export class ErrorBadRequest extends ExpressError {
    constructor(message:string = "Bad Request"){
        super(message, 400)
    }
}
export class ErrorNotAuthorized extends ExpressError {
    constructor(message:string = "Not Authorized"){
        super(message, 401)
    }
}
export class ErrorNotFound extends ExpressError {
    constructor(message:string = "Not Found"){
        super(message, 404)
    }
}