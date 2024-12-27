import { z } from "zod";

export const AdminloginSchema = z.object({
  username: z
    .string()
    .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
    .max(30, "نام کاربری نمی‌تواند بیشتر از ۳۰ کاراکتر باشد")
    .regex(
      /^[a-zA-Z0-9._-]+$/,
      "نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد و _ باشد"
    ),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

export type LoginSchema = z.infer<typeof AdminloginSchema>;
