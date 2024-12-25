"use client";

import { AppInput } from "@/components/atoms/appInput";
import AppModal from "@/components/molecules/appModal";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/validation/schemas/editProductForm";
import AppFileUploader, {
  ImageItem,
} from "@/components/molecules/appFileUploader";
import AppSelectBox from "@/components/atoms/appSelectBox";
import useCategories from "@/hooks/queries/useCategories";
import useSubcategories from "@/hooks/queries/useSubcategories";
import useEditProductById from "@/hooks/queries/useEditProductById";
import useSingleProductById from "@/hooks/queries/useGetProductById";
import AppSpinner from "@/components/atoms/appSpinner";
import { useEffect, useState } from "react";
import AppTextEditor from "@/components/molecules/appTextEditor";

export type ProductFormValues = z.infer<typeof productSchema>;

type AppProductModalProps = {
  productId: string;
  onClose: () => void;
  onSuccess: () => void;
};

const AppEditProductModal: React.FC<AppProductModalProps> = ({
  onClose,
  onSuccess,
  productId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
  });

  const { editProductById } = useEditProductById();
  const { categories, isCategoriesLoading } = useCategories({ page: 1 });
  const { isSubcategoriesLoading, subcategories } = useSubcategories({
    page: 1,
  });
  const { getProductById, isSingleProductByIdLoading, isRefetching } =
    useSingleProductById({
      id: productId,
    });

  const [updatedImages, setUpdatedImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    if (getProductById?.data) {
      setValue("name", getProductById?.data.product.name);
      setValue("brand", getProductById?.data.product.brand);
      setValue("category", getProductById?.data.product.category._id);
      setValue("subcategory", getProductById?.data.product.subcategory._id);
      setValue("description", {
        text: getProductById?.data.product.description as string,
        length: getProductById?.data.product.description.length,
      });
      setValue("quantity", getProductById?.data.product.quantity);
      setValue("price", getProductById?.data.product.price);
    }
  }, [getProductById, setValue]);

  const handleImageChange = (images: ImageItem[]) => {
    setUpdatedImages(images);
  };

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("subcategory", data.subcategory);
    formData.append("description", data.description.text);
    formData.append("quantity", String(data.quantity));
    formData.append("price", String(data.price));

    if (updatedImages.length > 0) {
      updatedImages.forEach((image) => {
        if (image.imageObject) {
          formData.append("images", image.imageObject);
        }
      });
    }

    const thumbnailImage = updatedImages.find(
      (image) => image.isThumbnail
    )?.imageObject;
    if (thumbnailImage) {
      formData.append("thumbnail", thumbnailImage);
    }

    editProductById(
      { id: productId, payLoad: formData },
      {
        onSuccess: (res) => {
          console.log(`Product ${res.data.product.name} edited successfully!`);
          onClose();
          onSuccess();
        },
        onError: (error) => {
          console.log("Error editing product:", error);
        },
      }
    );
  };

  if (isSingleProductByIdLoading) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <AppSpinner />
      </div>
    );
  }

  return (
    <AppModal
      title="ویرایش محصول"
      modalButtons={[
        { title: "ذخیره تغیرات", type: "submit" },
        { title: "لغو" },
      ]}
      onFirstButtonClick={handleSubmit(onSubmit)}
      onSecondButtonClick={onClose}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-between items-start"
      >
        <div className="w-full flex justify-between items-start gap-10">
          <div className="min-w-60 w-full">
            <AppInput
              id="product-name"
              type="text"
              sizing="sm"
              label="نام محصول"
              placeholder="نام محصول را وارد کنید..."
              {...register("name")}
              hasError={!!errors.name}
              helperText={errors.name?.message}
            />
            <AppInput
              id="product-brand"
              type="text"
              sizing="sm"
              label="برند"
              placeholder="برند محصول را وارد کنید..."
              {...register("brand")}
              hasError={!!errors.brand}
              helperText={errors.brand?.message}
              defaultValue={getProductById?.data.product.brand}
            />
            <div className="w-full flex justify-between items-start gap-3 mb-4">
              <AppSelectBox
                id="product-category"
                options={
                  isCategoriesLoading
                    ? []
                    : categories?.data?.categories.map((category) => ({
                        name: category.name,
                        value: category._id,
                      })) || []
                }
                label="دسته"
                sizing="sm"
                {...register("category")}
                hasError={!!errors.category}
                helperText={errors.category?.message}
                defaultValue={{
                  name: getProductById?.data.product.category.name,
                  value: getProductById?.data.product.category._id,
                }}
              />
              <AppSelectBox
                id="product-subcategory"
                options={
                  isSubcategoriesLoading
                    ? []
                    : subcategories?.data.subcategories.map((subcategory) => ({
                        name: subcategory.name,
                        value: subcategory._id,
                      })) || []
                }
                label="زیردسته"
                sizing="sm"
                {...register("subcategory")}
                hasError={!!errors.subcategory}
                helperText={errors.subcategory?.message}
                defaultValue={{
                  name: getProductById?.data.product.subcategory.name,
                  value: getProductById?.data.product.subcategory._id,
                }}
              />
            </div>
            <div className="w-full flex justify-between items-start gap-3">
              <AppInput
                id="product-quantity"
                type="text"
                sizing="sm"
                label="موجودی"
                placeholder="مثل: ۱۰۰"
                {...register("quantity", { valueAsNumber: true })}
                hasError={!!errors.quantity}
                helperText={errors.quantity?.message}
                defaultValue={getProductById?.data.product.quantity}
              />
              <AppInput
                id="product-price"
                type="text"
                sizing="sm"
                label="قیمت(تومان) "
                placeholder="مثال: ۲۰۰,۰۰۰"
                {...register("price", { valueAsNumber: true })}
                hasError={!!errors.price}
                helperText={errors.price?.message}
                defaultValue={getProductById?.data.product.price}
              />
            </div>
          </div>
          {!isSingleProductByIdLoading && getProductById?.data && (
            <AppFileUploader
              helperText={
                errors.images?.message ||
                "برای ویرایش تصاویر همه تصاویر قبلی را حذف کنید"
              }
              hasError={!!errors.images}
              defaultValue={getProductById?.data.product.images ?? []}
              defaultThumbnail={getProductById?.data.product.thumbnail ?? ""}
              isDisabled={false}
              onChange={handleImageChange}
            />
          )}
        </div>
        {!isRefetching && (
          <Controller
            control={control}
            name="description"
            render={(field) => (
              <AppTextEditor
                id="product-description"
                label="توضیحات"
                placeholder="توضیحات محصول را وارد کنید..."
                onChange={(t, length) =>
                  setValue("description", {
                    text: t,
                    length: length,
                  })
                }
                helperText={errors.description?.length?.message}
                hasError={!!errors.description?.length}
                defaultValue={getProductById?.data.product.description}
              />
            )}
          />
        )}
      </form>
    </AppModal>
  );
};

export default AppEditProductModal;
