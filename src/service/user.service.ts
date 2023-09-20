import { FilterQuery } from "mongoose";
import UserModel, { UserDocument, User } from "../models/user.model";

async function createUser(input: User) {
  try {
    const user = await UserModel.create(input);
    return user.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}

async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return false;
  }

  const isValid = user.comparePassword(password);
  if (!isValid) {
    return false;
  }

  return user.toJSON();
}

async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}

export { createUser, validatePassword, findUser };
