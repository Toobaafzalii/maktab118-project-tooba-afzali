"use client";

import { AppInput } from "@/components/atoms/appInput";
import { AppButton } from "@/components/molecules/appButton";
import AppOrderDetailsCard from "@/components/molecules/appOrderDetailsCard";
import ArrowRight from "../../../../../public/svg/CaretRight.svg";
import ArrowLeft from "../../../../../public/svg/CaretLeft.svg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { deliveryInfoSchema } from "@/validation/schemas/deliveryInfoForm";
import { useRouter } from "next/navigation";
import useCartStore from "@/stores/useCartStore";
import useSingleProductByIds from "@/hooks/queries/useGetProductByIds";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import useGetUserById from "@/hooks/queries/useGetUserById";
import useAuthStore from "@/stores/useAuthStore";
import useEditUserById from "@/hooks/queries/useEditUserById";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type FormData = z.infer<typeof deliveryInfoSchema>;

const DeliveryInfoPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(deliveryInfoSchema),
    mode: "onChange",
  });

  const router = useRouter();
  const { cartItems } = useCartStore((state) => state);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user, isRehydrateStorage } = useAuthStore((state) => state);
  const { getUserById, refetch } = useGetUserById({ id: user?._id || "" });
  const { editUserById } = useEditUserById();
  const { productsByIds } = useSingleProductByIds({
    ids: cartItems.map((item) => item.id),
  });

  const watchedFields = watch();
  const originalDataRef = useRef<FormData | null>(null);

  useEffect(() => {
    if (getUserById?.data?.user) {
      const { firstname, lastname, address, phoneNumber } =
        getUserById.data.user;
      originalDataRef.current = {
        firstname: firstname || "",
        lastname: lastname || "",
        address: address || "",
        phoneNumber: phoneNumber || "",
        date: new Date(),
      };
      setValue("firstname", firstname || "");
      setValue("lastname", lastname || "");
      setValue("address", address || "");
      setValue("phoneNumber", phoneNumber || "");
      setValue("date", new Date());
      trigger();
    }
  }, [getUserById?.data?.user, setValue, trigger]);

  const onSubmit = (data: any) => {
    if (user?._id) {
      const { date, ...userData } = data;
      const hasChanges = Object.keys(userData).some(
        (key) =>
          userData[key as keyof FormData] !==
          originalDataRef.current?.[key as keyof FormData]
      );

      if (hasChanges) {
        editUserById(
          { id: user._id, payLoad: userData },
          {
            onSuccess: (res) => {
              refetch();
              console.log(`User ${res.data} edited`);
            },
            onError: (error) => {
              console.log("Error editing user:", error);
            },
          }
        );
      } else {
        console.log("No changes detected");
      }
    }
  };

  const handleTotalPriceChange = (price: number) => {
    setTotalPrice(price);
  };

  if (!isRehydrateStorage) return null;

  return (
    <div className="relative bg-light-primary-surface-default flex flex-grow justify-between items-start p-10 py-16 w-full text-nowrap gap-2">
      <div className="flex flex-col flex-grow flex-1 justify-start items-start w-full gap-5 ">
        <div className="flex w-full flex-col justify-center items-start">
          <span className="text-title-24 text-light-primary-text-title">
            اطلاعات گیرنده
          </span>
          <span className="text-subtitle-16 text-light-primary-text-subtitle">
            جزئیات ارسال بسته و اطلاعات گیرنده را وارد کنید. در صورت ویرایش فرم
            اطلاعات کاربری شما نیز ویرایش خواهد شد
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
                id="firstname"
                sizing="lg"
                type="text"
                placeholder="نام گیرنده را اینجا وارد کنید..."
                {...register("firstname")}
                hasError={!!errors.firstname}
                helperText={errors.firstname?.message}
              />
            </div>
            <div className="w-full">
              <AppInput
                label="نام خانوادگی"
                id="lastname"
                sizing="lg"
                type="text"
                placeholder="نام خانوادگی گیرنده را اینجا وارد کنید..."
                {...register("lastname")}
                hasError={!!errors.lastname}
                helperText={errors.lastname?.message}
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
          <div className="w-full flex justify-between items-start gap-5">
            <div className="w-full">
              <AppInput
                label="تلفن همراه"
                id="phoneNumber"
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
            <div className="w-full">
              <DatePicker
                value={watchedFields.date}
                locale={persian_fa}
                name="date"
                editable={false}
                calendar={persian}
                onChange={(date) => {
                  date && setValue("date", date.toDate());
                }}
                render={
                  <AppInput
                    className="w-full"
                    id="date"
                    sizing="lg"
                    type="text"
                    label="تاریخ ارسال"
                    placeholder="کلیک کنید"
                  />
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
              onClick={() => {
                router.push(`/payment?Price=${totalPrice}`);
              }}
            />
          </div>
        </form>
      </div>
      <AppOrderDetailsCard
        hasButton={false}
        products={productsByIds}
        onTotalPriceChange={handleTotalPriceChange}
      />
    </div>
  );
};

export default DeliveryInfoPage;
