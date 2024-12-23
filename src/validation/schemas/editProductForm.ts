import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
const ACCEPTED_FILE_TYPES = ["image/jpeg"];

export const productSchema = z.object({
  name: z.string().min(3, "نام محصول ضروری است."),
  brand: z.string().min(3, "برند ضروری است."),
  category: z.string().min(3, "دسته ضروری است."),
  subcategory: z.string().min(3, "زیر دسته ضروری است."),
  description: z.string().min(5, "توضیحات ضروری است."),
  quantity: z
    .number({ invalid_type_error: "موجودی باید عدد باشد." })
    .min(1, "موجودی ضروری است."),
  price: z
    .number({ invalid_type_error: "قیمت باید عدد باشد." })
    .min(1, "قیمت ضروری است."),
  // images: z
  //   .array(
  //     z.object({
  //       id: z.number().optional(),
  //       url: z.string(),
  //       isThumbnail: z.boolean().optional(),
  //       imageObject: z.optional(
  //         z
  //           .instanceof(Blob)
  //           .optional()
  //           .refine(
  //             (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
  //             "فرمت فایل باید jpeg باشد."
  //           )
  //           .refine(
  //             (file) => !file || file.size <= MAX_UPLOAD_SIZE,
  //             "حجم فایل نباید بیشتر از ۳ مگابایت باشد."
  //           )
  //       ),
  //     })
  //   )
  //   .min(1, "حداقل یک تصویر باید آپلود شود."),
});
