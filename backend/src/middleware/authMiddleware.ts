
import express from "express";
type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  sub: string;
  "cognito:groups"?: string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string[];
      };
    }
  }
}

// ...existing code...
export const authMiddleware = (allowedGroups: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    console.log('=== Middleware hit ===', req.method, req.originalUrl);
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const decoded = jwt.decode(token) as DecodedToken;
      const userGroups = decoded["cognito:groups"] || [];

      req.user = {
        id: decoded.sub,
        role: userGroups, // store all groups as array
      };


      const hasAccess = userGroups.some(group =>
        allowedGroups.includes(group)
      );

      if (!hasAccess) {
        res.status(401).json({ message: "Access denied" });
        return;
      }
    } catch (err) {
      console.error("Failed to decode token:", err);
      res.status(400).json({ message: "Invalid token" });
      return;
    }

    next();
  };
};
