"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AppTimer from "@/components/atoms/appTimer";
import useNewOrder from "@/hooks/queries/useNewOrder";
import useCartStore from "@/stores/useCartStore";
import { count } from "console";
import useAuthStore from "@/stores/useAuthStore";
import AppPrivateRoute from "@/components/organisms/appPrivetRoute";
import useDeleteCart from "@/hooks/queries/useDeleteCart";

const MockPaymentPage: React.FC = () => {
  const [form, setForm] = useState({
    cardNumber: "",
    cvv2: "",
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
    secondPassword: "",
    email: "",
    phone: "",
  });
  const searchParams = useSearchParams();
  const { cartItems, removeItem } = useCartStore();
  const [price, setPrice] = useState(0);
  const router = useRouter();
  const { newOrder } = useNewOrder();
  const predefinedSecurityCode = "65284";
  const { user, isRehydrateStorage } = useAuthStore();
  const { deleteCart } = useDeleteCart();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{16}$/.test(form.cardNumber)) {
      alert("شماره کارت معتبر نیست .");
      return;
    }
    if (!/^\d{3,4}$/.test(form.cvv2)) {
      alert("CVV2 باید ۳ یا ۴ رقم باشد.");
      return;
    }
    if (form.securityCode !== predefinedSecurityCode) {
      alert("کد امنیتی وارد شده صحیح نمی‌باشد. لطفاً دوباره تلاش کنید.");
      return;
    }
    if (!/^\d{7,8}$/.test(form.secondPassword)) {
      alert("رمز پویا باید ۷ یا ۸ رقم باشد.");
      return;
    }
    () => {
      handlePaymentSubmit;
    };
  };

  useEffect(() => {
    const price = searchParams.get("Price");
    if (price) {
      setPrice(Number(price));
    }
  }, [searchParams]);

  const handleTimeoutEnd = () => {
    alert("زمان پرداخت به پایان رسید!");
    router.push("/purchase-result?result=timeout");
  };

  const handlePaymentSubmit = () => {
    const user = localStorage.getItem("auth-user");
    const userId = JSON.parse(user ?? "")?.state?.user?._id;
    const cartProducts: Array<{ product: string; count: number }> = [];
    cartItems.map((item) => {
      cartProducts.push({ product: item.id, count: item.quantity });
    });
    newOrder(
      {
        user: userId,
        products: cartProducts,
        deliveryStatus: false,
      },
      {
        onSuccess: (data) => {
          router.push(
            `/purchase-result?result=success&id=${data.data.order._id}`
          );
          deleteCart({ deleteAll: true });
        },
        onError: () => {
          router.push("/purchase-result?result=failure");
        },
      }
    );
  };

  const canAccess = useMemo(() => {
    return Boolean(user?.accessToken);
  }, [user]);

  if (!isRehydrateStorage) return null;
  return (
    <AppPrivateRoute canAccess={canAccess} redirectTo="/cart/delivery-info">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4 text-center">
          دروازه پرداخت اینترنتی پرداخت الکترونیک سامان
        </h1>
        <div className="w-full max-w-4xl bg-white shadow-md rounded-md p-6">
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="w-full border rounded-md p-4 bg-gray-50">
              <h2 className="text-lg font-bold mb-3">اطلاعات پذیرنده</h2>
              <ul className="w-full space-y-1 flex flex-col text-sm">
                <li>
                  <span className="w-full rounded-lg bg-gray-200 p-1.5 block">
                    <span className="font-bold px-1">کد ترمینال پذیرنده:</span>{" "}
                    10764058
                  </span>
                </li>
                <li>
                  <span className="w-full rounded-lg bg-gray-200 p-1.5 block">
                    <span className="font-bold px-1">کد پذیرنده:</span> 10759898
                  </span>
                </li>
                <li>
                  <span className="w-full rounded-lg bg-gray-200 p-1.5 block">
                    <span className="font-bold px-1">نام پذیرنده:</span> فروشگاه
                    tibziwear
                  </span>
                </li>
                <li>
                  <span className="w-full rounded-lg bg-gray-200 p-1.5 block">
                    <span className="font-bold px-1">آدرس سایت پذیرنده:</span>{" "}
                    tibziwear.ir
                  </span>
                </li>
                <li>
                  <span className="w-full rounded-lg bg-gray-200 p-1.5 block">
                    <span className="font-bold px-1">مبلغ قابل پرداخت:</span>{" "}
                    {price}0 ریال
                  </span>
                </li>
                <li>
                  <AppTimer initialTime={540} onTimeEnd={handleTimeoutEnd} />
                </li>
              </ul>
            </div>

            <form
              onSubmit={handleSubmit}
              className="border rounded-md p-4 bg-gray-50"
            >
              <h2 className="text-lg font-semibold mb-3">اطلاعات کارت</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">شماره کارت</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleChange}
                    maxLength={16}
                    className="w-full border px-3 py-2 rounded-md focus:outline-none"
                    placeholder="****-****-****-****"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    شماره شناسایی دوم (CVV2)
                  </label>
                  <input
                    type="text"
                    name="cvv2"
                    value={form.cvv2}
                    onChange={handleChange}
                    maxLength={4}
                    className="w-full border px-3 py-2 rounded-md focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">ماه</label>
                    <select
                      name="expiryMonth"
                      value={form.expiryMonth}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-md focus:outline-none"
                      required
                    >
                      <option value="">--</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option
                          key={i + 1}
                          value={String(i + 1).padStart(2, "0")}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">سال</label>
                    <select
                      name="expiryYear"
                      value={form.expiryYear}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-md focus:outline-none"
                      required
                    >
                      <option value="">--</option>
                      {Array.from({ length: 12 }, (_, i) => {
                        const year = (98 + i) % 100;
                        return (
                          <option key={i} value={String(year).padStart(2, "0")}>
                            {String(year).padStart(2, "0")}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">کد امنیتی</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      name="securityCode"
                      value={form.securityCode}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-md focus:outline-none"
                      placeholder="کد امنیتی را وارد کنید"
                      required
                    />
                    <span className="ml-3 bg-teal-500 px-4 py-2 font-bold rounded-md">
                      {predefinedSecurityCode}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">رمز پویا</label>
                  <input
                    type="password"
                    name="secondPassword"
                    value={form.secondPassword}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">ایمیل (اختیاری)</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md focus:outline-none"
                    placeholder="example@mail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    شماره تلفن (اختیاری)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                      router.push("/purchase-result?result=failure");
                    }}
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={handlePaymentSubmit}
                  >
                    پرداخت
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppPrivateRoute>
  );
};

export default MockPaymentPage;
