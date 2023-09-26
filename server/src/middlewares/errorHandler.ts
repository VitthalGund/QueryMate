import { logEvents } from "./logEvents.js";
import { Request, Response } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response
  //   next: NextFunction
) => {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
};

export default errorHandler;
