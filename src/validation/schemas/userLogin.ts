import { z } from "zod";

export const UserloginSchema = z.object({
  username: z
    .string()
    .min(8, "نام کاربری باید حداقل ۸ کاراکتر باشد")
    .max(30, "نام کاربری نمی‌تواند بیشتر از ۳۰ کاراکتر باشد")
    .regex(
      /^[a-zA-Z0-9._-]+$/,
      "نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد و _ باشد"
    ),
  password: z
    .string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "رمز عبور باید شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر باشد"
    ),
});

export type LoginSchema = z.infer<typeof UserloginSchema>;
