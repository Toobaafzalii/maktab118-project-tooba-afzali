"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AppInput } from "@/components/atoms/appInput";
import XIcon from "../../../../public/svg/X-icon.svg";
import Person from "../../../../public/svg/person-stroke.svg";
import EyeClosed from "../../../../public/svg/EyeClosed.svg";
import Lock from "../../../../public/svg/Lock.svg";
import { AppButton } from "@/components/molecules/appButton";
import useLogin from "@/hooks/queries/template/useMutration";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserloginSchema } from "@/validation/schemas/userLogin";
import useAuthStore from "../../../stores/useAuthStore/index";

interface FormData {
  username: string;
  password: string;
}

const UserloginPage: React.FC = () => {
  const router = useRouter();
  const { isLoginLoading, login } = useLogin();
  const setAuthUser = useAuthStore((state) => state.setUser);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(UserloginSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    login(formData, {
      onSuccess: (data) => {
        setAuthUser({
          accessToken: data.token.accessToken,
          refreshToken: data.token.refreshToken,
          role: data.data.user.role,
          firstName: data.data.user.firstname,
          lastName: data.data.user.lastname,
        });
        router.push("/");
      },
    });
  };

  const handleToggleVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="bg-light-primary-surface-default border-[1px] border-light-primary-border-default py-12 max-h-screen px-32 gap-6 w-full flex flex-col justify-center items-start h-[70vh]">
      <div className="space-y-1">
        <p className="text-light-primary-text-title text-title-24">
          ورود به حساب کاربری
        </p>
        <p className="text-light-primary-text-title text-subtitle-16">
          خوش برگشتید، لطفا اطلاعات ورود خود را وارد کنید.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-2">
        <div className="w-full">
          <AppInput
            {...register("username")}
            id="admin-username-input"
            sizing="lg"
            label="نام کاربری"
            color="base"
            type="text"
            placeholder="نام کاربری خود را وارد کنید..."
            rightIcon={(className) => <Person className={className} />}
            icon={(className) => <XIcon className={className} />}
            iconFunctionality={{
              type: "toggleFocus",
              callback: (isFocused) => {},
            }}
            hasError={!!errors.username}
            helperText={errors.username?.message}
          />
        </div>

        <div className="w-full">
          <AppInput
            {...register("password")}
            id="admin-password-input"
            sizing="lg"
            label="رمز عبور"
            color="base"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="رمز عبور خود را وارد کنید..."
            rightIcon={(className) => <Lock className={className} />}
            icon={(className) => <EyeClosed className={className} />}
            iconFunctionality={{
              type: "toggleVisibility",
              callback: handleToggleVisibility,
            }}
            hasError={!!errors.password}
            helperText={errors.password?.message}
          />
        </div>

        <AppButton
          text={isLoginLoading ? "در حال ورود به حساب..." : "ورود به حساب"}
          size="xl"
          variant="primary"
          fullWidth
          isDisabled={!isValid || isLoginLoading}
          type="submit"
        />
      </form>
    </div>
  );
};

export default UserloginPage;
