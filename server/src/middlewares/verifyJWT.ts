import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

type JwtPayload = {
  UserInfo: {
    username: string;
    roles: {
      User?: number;
      Editor?: number;
      Admin?: number;
    };
  };
} & jwt.JwtPayload;

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string =
    (req.headers.authorization as string) ||
    (req.headers.Authorization as string);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded: JwtPayload) => {
      if (err) return res.status(403).json(err); //invalid token
      // Object.defineProperty(req, "user", decoded.UserInfo.username);
      req["user"] = decoded.UserInfo.username;
      // Object.defineProperty(req, "roles", decoded.UserInfo.roles);
      req["roles"] = decoded.UserInfo.roles;
      next();
    }
  );
};
