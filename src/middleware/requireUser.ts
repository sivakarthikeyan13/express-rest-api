import { NextFunction, Request, Response } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  return user ? next() : res.sendStatus(403);
};

export default requireUser;
