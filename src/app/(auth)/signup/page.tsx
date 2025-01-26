"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AppInput } from "@/components/atoms/appInput";
import XIcon from "../../../../public/svg/X-icon.svg";
import EyeClosed from "../../../../public/svg/EyeClosed.svg";
import { AppButton } from "@/components/molecules/appButton";
import useSignup, { QueryFnProps } from "@/hooks/queries/useSignup";
import useLogin from "@/hooks/queries/useLogin";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSignupSchema } from "@/validation/schemas/userSignup";
import useAuthStore from "../../../stores/useAuthStore/index";
import useCartStore from "@/stores/useCartStore";
import useAddCart from "@/hooks/queries/useAddCart";

interface FormData {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
}

const UserSignupPage: React.FC = () => {
  const router = useRouter();
  const { isSignupLoading, signup } = useSignup();
  const setAuthUser = useAuthStore((state) => state.setUser);
  const authUser = useAuthStore((state) => state.user);
  const { cartItems, setItems } = useCartStore((state) => state);
  const { addCart } = useAddCart();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(UserSignupSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    const { confirmPassword, ...rest } = formData;
    const signupData: QueryFnProps = { ...rest };

    signup(signupData, {
      onSuccess: (data) => {
        setAuthUser({
          _id: data.data.user._id,
          accessToken: data.token.accessToken,
          refreshToken: data.token.refreshToken,
          role: data.data.user.role,
          firstName: data.data.user.firstname,
          lastName: data.data.user.lastname,
        });
        router.push("/");
      },
      onError: (error) => {
        console.error("Signup error:", error);
      },
    });
  };

  useEffect(() => {
    if (authUser?.accessToken) {
      addCart(cartItems);
    }
  }, [authUser]);

  const handleToggleVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleToggleConfirmVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="bg-light-primary-surface-default border-[1px] border-light-primary-border-default max-h-screen px-10 sm:px-20 py-10 w-full flex flex-col justify-between items-start">
      <div>
        <p className="text-light-primary-text-title text-title-24 mb-8">
          ایجاد حساب کاربری
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="w-full flex justify-between items-start gap-2">
          <AppInput
            {...register("firstname")}
            id="first-name"
            sizing="sm"
            label="نام"
            placeholder="نام..."
            color="base"
            type="text"
            hasError={!!errors.firstname}
            helperText={errors.firstname?.message}
          />
          <AppInput
            {...register("lastname")}
            id="last-name"
            sizing="sm"
            label="نام خانوادگی"
            placeholder="نام خانوادگی..."
            color="base"
            type="text"
            hasError={!!errors.lastname}
            helperText={errors.lastname?.message}
          />
        </div>
        <div className="w-full flex justify-between items-start gap-2">
          <AppInput
            {...register("username")}
            id="user-name"
            sizing="sm"
            label="نام کاربری"
            placeholder="نام کاربری..."
            color="base"
            type="text"
            icon={(className) => <XIcon className={className} />}
            iconFunctionality={{
              type: "toggleFocus",
              callback: (isFocused) => {},
            }}
            hasError={!!errors.username}
            helperText={errors.username?.message}
          />
          <AppInput
            {...register("phoneNumber")}
            id="phoneNumber"
            sizing="sm"
            label="شمارهمراه"
            color="base"
            type="text"
            placeholder="شماره همراه..."
            icon={(className) => <XIcon className={className} />}
            iconFunctionality={{
              type: "toggleFocus",
              callback: (isFocused) => {},
            }}
            hasError={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
        </div>
        <div className="w-full flex justify-between items-start gap-2">
          <AppInput
            {...register("password")}
            id="password"
            sizing="sm"
            label="رمز عبور"
            placeholder="رمز عبور..."
            color="base"
            type={isPasswordVisible ? "text" : "password"}
            icon={(className) => <EyeClosed className={className} />}
            iconFunctionality={{
              type: "toggleVisibility",
              callback: handleToggleVisibility,
            }}
            hasError={!!errors.password}
            helperText={errors.password?.message}
          />
          <AppInput
            {...register("confirmPassword")}
            id="confirmPassword"
            sizing="sm"
            label=" تکرار رمز عبور"
            placeholder="تکرار رمز عبور..."
            color="base"
            type={isConfirmPasswordVisible ? "text" : "password"}
            icon={(className) => <EyeClosed className={className} />}
            iconFunctionality={{
              type: "toggleVisibility",
              callback: handleToggleConfirmVisibility,
            }}
            hasError={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </div>

        <div className="w-full">
          <AppInput
            {...register("address")}
            id="address"
            sizing="sm"
            label="آدرس"
            color="base"
            type="text"
            placeholder="آدرس را وارد کنید..."
            icon={(className) => <XIcon className={className} />}
            iconFunctionality={{
              type: "toggleFocus",
              callback: (isFocused) => {},
            }}
            hasError={!!errors.address}
            helperText={errors.address?.message}
          />
        </div>

        <AppButton
          text={
            isSignupLoading ? "در حال ایجاد حساب  ..." : "ایجاد حساب کاربری"
          }
          size="xl"
          variant="primary"
          fullWidth
          isDisabled={!isValid || isSignupLoading}
          type="submit"
        />
      </form>
    </div>
  );
};

export default UserSignupPage;
