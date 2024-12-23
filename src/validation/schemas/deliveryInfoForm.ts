import { z } from "zod";

export const deliveryInfoSchema = z.object({
  firstName: z.string().min(3, { message: "نام گیرنده الزامی است" }),
  lastName: z.string().min(3, { message: "نام خانوادگی گیرنده الزامی است" }),
  address: z.string().min(5, { message: "آدرس الزامی است" }),
  phoneNumber: z
    .string()
    .regex(/^09\d{9}$/, {
      message: "فرمت وارد شده قابل قبول نیست",
    })
    .min(1, { message: "تلفن همراه الزامی است" })
    .transform((val) => val.trim()),
  date: z.date(),
});
