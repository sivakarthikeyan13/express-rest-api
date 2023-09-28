import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser, findUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";

async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    if (e.message.includes("E11000")) {
      return res.status(409).send("An account with this email already exists");
    }
    return res.status(409).send(e.message);
  }
}

async function getUserHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const user = await findUser({ _id: userId });
  if (!user) {
    return res.sendStatus(404);
  }
  return res.send(user);
}

export { createUserHandler, getUserHandler };
