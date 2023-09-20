import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
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

export { createUserHandler };
