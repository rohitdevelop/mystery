// import z from "zod";

// export const UsernameValidation = z
//   .string()
//   .min(2, "username munst be 2 charcters")
//   .max(20, "username must be no more that 20 charcters")
//   .regex(
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//     "username must be contain special charater"
//   );

// export const signUpSchema = z.object({
//   username: UsernameValidation,
//   email: z.string().email({ message: "invailid email" }),
//   password: z
//     .string()
//     .min(6, { message: "must be 6 charater" })
//     .max(8, "no more then 8 charater"),
// });


import z from "zod";

export const UsernameValidation = z
  .string()
  .min(2, "username must be at least 2 characters")
  .max(20, "username must be no more than 20 characters")
  .regex(
    /^[a-zA-Z0-9._]+$/,
    "username can contain only letters, numbers, dot or underscore"
  );

export const signUpSchema = z.object({
  username: UsernameValidation,
  email: z.string().email({ message: "invalid email" }),
  password: z
    .string()
    .min(6, { message: "must be 6 characters" })
    .max(8, "no more than 8 characters"),
});
