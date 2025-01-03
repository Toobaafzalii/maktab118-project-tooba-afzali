import { z } from "zod";

export const UserSignupSchema = z
  .object({
    firstname: z
      .string()
      .min(1, "نام ضروری است")
      .max(30, "نام نمی‌تواند بیشتر از ۳۰ کاراکتر باشد"),
    lastname: z
      .string()
      .min(1, "نام خانوادگی ضروری است")
      .max(30, "نام خانوادگی نمی‌تواند بیشتر از ۳۰ کاراکتر باشد"),
    username: z
      .string()
      .min(8, "نام کاربری باید حداقل ۸ کاراکتر باشد")
      .max(30, "نام کاربری نمی‌تواند بیشتر از ۳۰ کاراکتر باشد")
      .regex(/^[a-zA-Z0-9._-]+$/, "  فقط می‌تواند شامل حروف،اعداد و _ باشد"),
    password: z
      .string()
      .min(8, "حداقل هشت کاراکتر وارد کنید")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "رمز عبور ناامن است"
      ),
    confirmPassword: z.string().min(8, "رمز عبور مطابقت ندارد"),
    phoneNumber: z
      .string()
      .regex(/^09\d{9}$/, {
        message: "فرمت وارد شده قابل قبول نیست",
      })
      .min(1, { message: "تلفن همراه الزامی است" })
      .transform((val) => val.trim()),
    address: z
      .string()
      .min(5, "آدرس باید حداقل ۵ کاراکتر باشد")
      .max(100, "آدرس نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور مطابقت ندارد",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof UserSignupSchema>;
