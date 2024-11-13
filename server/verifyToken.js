import { createError } from "./errors.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) {
        return next(createError(401, "Unauthorized Access!"))
    }

    // verifying the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) return next(createError(403, "Token is invalid. Access forbidden!"))
        req.user = user;
        next()
    })

}