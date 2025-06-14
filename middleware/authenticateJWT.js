import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
import { HTTP } from "../util/const.js";
// Middleware para autenticar JWT
export function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log(`[${req.method}] ${req.originalUrl} -> Forbidden`);
        console.log("JWT verification failed:", err.cause || err.message);
        return res.sendStatus(HTTP.FORBIDDEN);
      }
      req.user = user;
      next();
    });
  } else {
    console.log(`[${req.method}] ${req.originalUrl} -> Unauthorized`);
    res.sendStatus(HTTP.UNAUTHORIZED);
  }
}
