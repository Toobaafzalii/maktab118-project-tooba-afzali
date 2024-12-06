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
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/schemas/adminLogin";

interface FormData {
  username: string;
  password: string;
}

const Test: React.FC = () => {
  const router = useRouter();
  const { isLoginLoading, login } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    login(formData, {
      onSuccess: (data) => {
        if (data.data.user.role === "ADMIN") {
          localStorage.setItem("access-token", data.token.accessToken);
          localStorage.setItem("refresh-token", data.token.refreshToken);
          localStorage.setItem("role", data.data.user.role);
          router.push("/dashboard");
        }
      },
      onError: (error) => {
        const axiosError = error as AxiosError;
      },
    });
  };

  const handleToggleVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="bg-light-primary-surface-default border-[1px] border-light-primary-border-default pb-60 pt-32 px-32 gap-11 w-[609px] flex flex-col justify-start items-start">
      <div className="space-y-1">
        <p className="text-light-primary-text-title text-title-24">
          ورود به داشبورد
        </p>
        <p className="text-light-primary-text-title text-subtitle-16">
          خوش برگشتید، لطفا اطلاعات ورود خود را وارد کنید.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
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
          text={
            isLoginLoading ? "در حال ورود به داشبورد..." : "ورود به داشبورد"
          }
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

export default Test;
