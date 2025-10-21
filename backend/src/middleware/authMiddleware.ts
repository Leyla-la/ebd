import express from "express";
type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;
import jwt from "jsonwebtoken";

// Define a mapping from broader groups to more specific roles
const groupToRoles: { [key: string]: string[] } = {
  SuperAdmins: ["SuperAdmins", "admin", "employee"],
  Admins: ["admin", "employee"],
  Employees: ["employee"],
};

export const authMiddleware = (allowedGroups: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(`[AuthMiddleware] Accessing path: ${req.path}`);
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("[AuthMiddleware] No token provided.");
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      const payload = jwt.decode(token, { complete: true })?.payload;
      if (!payload || typeof payload === "string") {
        console.log("[AuthMiddleware] Invalid token payload.");
        return res.status(401).json({ error: "Invalid token payload" });
      }

      const userCognitoGroups = payload["cognito:groups"] || [];
      console.log(`[AuthMiddleware] User Cognito groups: ${JSON.stringify(userCognitoGroups)}`);
      console.log(`[AuthMiddleware] Route requires one of: ${JSON.stringify(allowedGroups)}`);

      // If the route requires no specific groups, let it pass
      if (allowedGroups.length === 0) {
        console.log("[AuthMiddleware] No specific groups required. Granting access.");
        (req as any).user = { id: payload.sub, roles: [] }; // Attach basic user info
        return next();
      }

      // Expand user's roles based on their Cognito groups
      const userRoles = userCognitoGroups.reduce((acc: string[], group: string) => {
        const roles = groupToRoles[group] || [group];
        return [...new Set([...acc, ...roles])];
      }, []);
      console.log(`[AuthMiddleware] User's expanded roles: ${JSON.stringify(userRoles)}`);

      const isAuthorized = allowedGroups.some(allowedGroup => userRoles.includes(allowedGroup));

      if (!isAuthorized) {
        console.log("[AuthMiddleware] Forbidden: User does not have any of the required roles.");
        return res.status(403).json({ error: "Forbidden: You don't have the required permissions." });
      }

      console.log("[AuthMiddleware] Authorization successful.");
      (req as any).user = {
        id: payload.sub,
        roles: userRoles,
      };

      next();
    } catch (error) {
      console.error("[AuthMiddleware] Authentication error:", error);
      return res.status(401).json({ error: "Invalid token" });
    }
  };
};
