import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({ required_error: "Password is required" }).min(
      6,
      "Password too short - should be min 6 characters "
    ),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),
    email: string({ required_error: "Email is required" }).email(
      "Not a valid email"
    ),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
};

const params = {
  params: object({ userId: string({ required_error: "userId is required" }) }),
};

const createUserSchema = object({ ...payload });

const getUserSchema = object({ ...params });

type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
type GetUserInput = TypeOf<typeof getUserSchema>;

export { createUserSchema, getUserSchema, CreateUserInput, GetUserInput };
