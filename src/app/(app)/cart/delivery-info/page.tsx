"use client";

import { AppInput } from "@/components/atoms/appInput";
import { AppButton } from "@/components/molecules/appButton";
import AppOrderDetailsCard from "@/components/molecules/appOrderDetailsCard";
import ArrowRight from "../../../../../public/svg/CaretRight.svg";
import ArrowLeft from "../../../../../public/svg/CaretLeft.svg";
import { useForm } from "react-hook-form";
import { isDirty, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { deliveryInfoSchema } from "@/validation/schemas/deliveryInfoForm";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof deliveryInfoSchema>;

const DeliveryInfoPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(deliveryInfoSchema),
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="relative bg-light-primary-surface-default flex flex-grow justify-between items-start p-10 py-16 w-full text-nowrap gap-2">
      <div className="flex flex-col flex-grow flex-1 justify-start items-start w-full gap-5 ">
        <div className="flex w-full flex-col justify-center items-start">
          <span className="text-title-24 text-light-primary-text-title">
            اطلاعات گیرنده
          </span>
          <span className="text-subtitle-16 text-light-primary-text-subtitle">
            لطفا جزئیات ارسال بسته و اطلاعات گیرنده بسته را وارد کنید.
          </span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-between items-start gap-5 py-6 px-8 bg-light-primary-surface-default-subtle"
        >
          <div className="w-full flex justify-between items-center gap-5">
            <div className="w-full">
              <AppInput
                label="نام"
                id="costumer-first-name"
                sizing="lg"
                type="text"
                placeholder="نام گیرنده را اینجا وارد کنید..."
                {...register("firstName")}
                hasError={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </div>
            <div className="w-full">
              <AppInput
                label="نام خانوادگی"
                id="costumer-last-name"
                sizing="lg"
                type="text"
                placeholder="نام خانوادگی گیرنده را اینجا وارد کنید..."
                {...register("lastName")}
                hasError={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </div>
          </div>
          <div className="w-full">
            <AppInput
              label="آدرس"
              id="address"
              sizing="lg"
              type="text"
              placeholder="لطفا آدرس را به صورت کامل وارد کنید..."
              {...register("address")}
              hasError={!!errors.address}
              helperText={errors.address?.message}
            />
          </div>
          <div className="w-full flex justify-between items-center gap-5">
            <div className="w-full">
              <AppInput
                label="تلفن همراه"
                id="costumer-phone-number"
                sizing="lg"
                type="text"
                placeholder="مثال ۰۹۱۲۳۴۵۶۷۸۹"
                {...register("phoneNumber")}
                hasError={!!errors.phoneNumber}
                helperText={
                  errors.phoneNumber?.message || "جهت هماهنگی ارسال سفارش"
                }
              />
            </div>
          </div>
          <div className="w-full flex justify-between items-center gap-5">
            <AppButton
              text="بازگشت به سبد"
              variant="primary"
              outline
              iconRight={(className) => <ArrowRight className={className} />}
              size="l"
              onClick={() => router.push("/cart")}
            />
            <AppButton
              text="اتصال به درگاه پرداخت"
              variant="primary"
              iconLeft={(className) => <ArrowLeft className={className} />}
              size="l"
              type="submit"
              isDisabled={!isValid}
              onClick={() => router.push("/payment")}
            />
          </div>
        </form>
      </div>
      <AppOrderDetailsCard hasButton={false} />
    </div>
  );
};

export default DeliveryInfoPage;
