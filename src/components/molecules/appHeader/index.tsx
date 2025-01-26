"use client";

import { MegaMenu, Navbar } from "flowbite-react";
import { AppButton } from "../appButton";
import TwLogo from "../../../../public/svg/TW-logo.svg";
import ArrowDown from "../../../../public/svg/CaretDown.svg";
import ShoppingCart from "../../../../public/svg/ShoppingCart.svg";
import ExitArrow from "../../../../public/svg/ArrowUDownRight.svg";
import Cube from "../../../../public/svg/Cube.svg";
import useSubcategories from "@/hooks/queries/useSubcategories";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import AppCartDropdown from "@/components/organisms/appCartDropdown";
import { useState, useRef, useEffect } from "react";
import useCartStore from "@/stores/useCartStore";
import useCategories from "@/hooks/queries/useCategories";
import { content } from "flowbite-react/tailwind";

const customTheme = {
  root: {
    base: "w-full fixed top-0 z-50 bg-light-primary-surface-negative text-body-18 text-light-primary-text-negative-subtle py-3 flex justify-between items-center",
    rounded: {
      on: "rounded-none",
      off: "",
    },
    bordered: {
      on: "border-none",
      off: "",
    },
    inner: {
      base: "mx-auto w-full flex flex-nowrap items-center justify-between",
      fluid: {
        on: "",
        off: "container",
      },
    },
  },
  brand: {
    base: "flex !items-start gap-2",
  },
  collapse: {
    base: "w-full md:block text-body-18",
    list: "mt-4 flex flex-col items-start gap-4 md:mt-0 md:flex-row md:space-x-8 ",
    hidden: {
      on: "hidden",
      off: "",
    },
  },
  link: {
    base: "block py-2 md:p-0",
    active: {
      on: "text-light-primary-text-negative-subtle md:bg-transparent ",
      off: "text-light-primary-text-negative-subtle hover:text-light-primary-text-negative-subtle",
    },
    disabled: {
      on: "cursor-not-allowed",
      off: "",
    },
  },
  toggle: {
    base: "flex items-center gap-2 p-2 md:hidden text-body-18 text-light-primary-surface-negative",
    icon: " h-6 w-6 !text-light-primary-text-negative-subtle",
  },
  dropdown: {
    base: "border-none",
    toggle: {
      arrowIcon: "h-4 w-4",
      content:
        "py-1 focus:outline-none border-none !bg-light-primary-surface-negative-subtle",
      floating: {
        animation: "transition-opacity",
        arrow: {
          base: "absolute z-10 h-2 w-2 rotate-45 border-none",
          style: {
            light: "border-none",
            auto: "border-none",
          },
          placement: "-4px",
        },
        base: "z-10 divide-y rounded-none shadow focus:outline-none mt-2 block",
        content: "py-1",
        divider: "my-1 ",
        header: "block px-4 py-2 ",
        hidden: "invisible opacity-0",
        item: {
          container: "",
          base: "flex cursor-pointer items-center justify-start px-4 py-2 focus:outline-none",
          icon: " h-4 w-4",
        },
        style: {
          light: "border-none",
          auto: "border-none",
        },
        target: "",
      },
      inlineWrapper: "flex w-full items-center justify-between",
    },
  },
  dropdownToggle: {
    base: "py-2 pl-3 pr-4 md:p-0 border-b md:border-0 md:hover:bg-transparent flex w-full items-center justify-between",
  },
};

const AppHeader: React.FC = () => {
  const { subcategories } = useSubcategories({ page: 1 });
  const { categories } = useCategories({ page: 1 });
  const { user, clearUser } = useAuthStore();
  const { cartItems, setItems } = useCartStore((state) => state);
  const router = useRouter();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const userDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCartDropDown = () => {
    setIsCartOpen((prev) => !prev);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    clearUser();
    setItems([]);
  };

  return (
    <div className="max-w-full relative">
      <MegaMenu theme={customTheme}>
        <div className="w-full relative mx-auto flex flex-col md:flex-row lg:flex-nowrap items-center justify-between py-3 px-6 text-nowrap">
          <div className="flex w-full md:w-fit justify-between">
            <Navbar.Brand href="/" className="flex items-center">
              <span className="text-title-28 hidden lg:flex">TIBZIWEAR</span>
              <TwLogo className="h-8 w-8" />
            </Navbar.Brand>
            <div className="flex items-center md:hidden">
              {user ? (
                <div className="flex justify-between !items-center gap-2 px-4">
                  <div
                    className="flex justify-between items-center gap-1 cursor-pointer"
                    onClick={toggleUserDropdown}
                    tabIndex={0}
                  >
                    <ArrowDown />
                    <span>{user.firstName + " " + user.lastName}</span>
                  </div>
                  <img
                    src="./svg/UserAvatar.svg"
                    alt="user"
                    className="hidden lg:flex lg:w-10 lg:h-10"
                  />
                  {isUserDropdownOpen && (
                    <div
                      ref={userDropdownRef}
                      className="absolute top-[60px] sm:left-80 bg-light-primary-surface-negative-subtle shadow-lg rounded-sm py-1 w-40"
                    >
                      {user.role === "ADMIN" && (
                        <button
                          className="w-full text-right p-2 hover:bg-light-primary-surface-negative text-light-primary-text-negative-subtle flex justify-start items-center gap-2"
                          onClick={() => router.push("/dashboard")}
                        >
                          <Cube />
                          ورود به داشبورد
                        </button>
                      )}
                      <button
                        className="w-full text-right p-2 hover:bg-light-primary-surface-negative text-light-error-text-title flex justify-start items-center gap-2"
                        onClick={() => handleLogout()}
                      >
                        <ExitArrow />
                        خروج از حساب
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="text-subtitle-14 cursor-pointer text-light-primary-text-negative-subtle px-4"
                  onClick={() => router.push("/signup")}
                >
                  ورود/ثبت نام
                </div>
              )}
              <div className="relative">
                {cartItems.length > 0 && (
                  <div className="rounded-lg flex z-10 justify-center items-center w-7 h-7 bg-dark-error-text-negative absolute top-[-12px] right-[-8px]">
                    {cartItems.length}
                  </div>
                )}
                <AppButton
                  text="سبد خرید"
                  variant="secondary"
                  iconLeft={(className) => (
                    <ShoppingCart className={className} />
                  )}
                  onClick={toggleCartDropDown}
                />
              </div>
            </div>
            <Navbar.Toggle className="md:hidden" />
          </div>
          <Navbar.Collapse className="w-full md:w-auto">
            {categories?.data.categories.map((categoryItem) => (
              <MegaMenu.Dropdown
                className="!bg-light-primary-surface-negative-subtle text-body-18 border-none"
                toggle={<>{categoryItem.name}</>}
              >
                <ul className="min-w-[200px] w-full grid grid-cols-1 !bg-light-primary-surface-negative-subtle">
                  {subcategories?.data.subcategories
                    .filter(
                      (subcategory) => subcategory.category === categoryItem._id
                    )
                    .map((subcategory) => (
                      <li
                        onClick={() =>
                          router.push(
                            `/${categoryItem.slugname}/${subcategory.slugname}`
                          )
                        }
                        key={subcategory._id}
                        className="w-full p-3 text-start text-body-18 hover:bg-light-primary-surface-negative text-light-primary-text-negative-subtle"
                      >
                        {subcategory.name
                          .replace("بانوان", "")
                          .replace("آقایان", "")}
                      </li>
                    ))}
                </ul>
              </MegaMenu.Dropdown>
            ))}
            <Navbar.Link
              className="text-nowrap hover:text-light-primary-text-negative cursor-pointer"
              onClick={() => router.push("/aboutUs")}
            >
              درباره ما
            </Navbar.Link>
          </Navbar.Collapse>
          <div className="hidden items-center md:flex">
            {user ? (
              <div className="flex justify-between !items-center gap-2 px-4">
                <div
                  className="flex justify-between items-center gap-1 cursor-pointer"
                  onClick={toggleUserDropdown}
                  tabIndex={0}
                >
                  <ArrowDown />
                  <span>{user.firstName + " " + user.lastName}</span>
                </div>
                <img
                  src="./svg/UserAvatar.svg"
                  alt="user"
                  className="hidden lg:flex lg:w-10 lg:h-10"
                />
                {isUserDropdownOpen && (
                  <div
                    ref={userDropdownRef}
                    className="absolute top-[60px] left-40 bg-light-primary-surface-negative-subtle shadow-lg rounded-sm py-1 w-40"
                  >
                    {user.role === "ADMIN" && (
                      <button
                        className="w-full text-right p-2 hover:bg-light-primary-surface-negative text-light-primary-text-negative-subtle flex justify-start items-center gap-2"
                        onClick={() => router.push("/dashboard")}
                      >
                        <Cube />
                        ورود به داشبورد
                      </button>
                    )}
                    <button
                      className="w-full text-right p-2 hover:bg-light-primary-surface-negative text-light-error-text-title flex justify-start items-center gap-2"
                      onClick={() => handleLogout()}
                    >
                      <ExitArrow />
                      خروج از حساب
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="text-subtitle-14 cursor-pointer text-light-primary-text-negative-subtle px-4"
                onClick={() => router.push("/signup")}
              >
                ورود/ثبت نام
              </div>
            )}
            <div className="relative">
              {cartItems.length > 0 && (
                <div className="rounded-lg flex z-10 justify-center items-center w-7 h-7 bg-dark-error-text-negative absolute top-[-12px] right-[-8px]">
                  {cartItems.length}
                </div>
              )}
              <AppButton
                text="سبد خرید"
                variant="secondary"
                iconLeft={(className) => <ShoppingCart className={className} />}
                onClick={toggleCartDropDown}
              />
            </div>
          </div>
        </div>
        {isCartOpen && <AppCartDropdown onClose={() => setIsCartOpen(false)} />}
      </MegaMenu>
    </div>
  );
};

export default AppHeader;
