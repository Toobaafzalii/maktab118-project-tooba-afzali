"use client";

import { AppInput } from "@/components/atoms/appInput";
import AppModal from "@/components/molecules/appModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/validation/schemas/newProductForm";
import AppFileUploader from "@/components/molecules/appFileUploader";
import AppSelectBox from "@/components/atoms/appSelectBox";
import useNewProduct from "@/hooks/queries/useNewProduct";
import useCategories from "@/hooks/queries/useCategories";
import useSubcategories from "@/hooks/queries/useSubcategories";

export type ProductFormValues = z.infer<typeof productSchema>;

type AppProductModalProps = {
  onClose: () => void;
  onSuccess: () => void;
};

const AppProductModal: React.FC<AppProductModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
  });

  const { isNewProductLoading, newProduct, newProductData } = useNewProduct();
  const { categories, isCategoriesLoading } = useCategories({ page: 1 });
  const { isSubcategoriesLoading, subcategories } = useSubcategories({
    page: 1,
  });

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    const formData = new FormData();

    const images = data.images.map((image) => image.imageObject);

    const thumbnailImage = data.images.find(
      (image) => image.isThumbnail
    )?.imageObject;

    images.map((image) => formData.append("images", image));
    if (thumbnailImage) {
      formData.append("thumbnail", thumbnailImage);
    }
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("subcategory", data.subcategory);
    formData.append("description", data.description);
    formData.append("quantity", String(data.quantity));
    formData.append("price", String(data.price));

    newProduct(formData, {
      onSuccess: (res) => {
        console.log(`Product ${res.data.product.name} created  successfully!`);
        onClose();
        onSuccess();
      },
      onError: (error) => {},
    });
  };

  return (
    <AppModal
      title="افزودن محصول"
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
        className="w-full flex justify-between items-start gap-10"
      >
        <div className="min-w-72 w-full">
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
            />
          </div>
          <AppInput
            id="product-description"
            type="text"
            sizing="sm"
            label="توضیحات"
            placeholder="توضیخات محصول را وارد کنید..."
            {...register("description")}
            hasError={!!errors.description}
            helperText={errors.description?.message}
          />
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
            />
          </div>
        </div>
        <AppFileUploader
          {...register("images")}
          hasError={!!errors.images}
          helperText={
            errors.images?.message ||
            "فرمت قابل قبول: jpeg، حجم کمتر از ۳ مگابایت"
          }
          onChange={(images) => {
            // @ts-ignore
            setValue("images", images, { shouldValidate: true });
          }}
        />
      </form>
    </AppModal>
  );
};

export default AppProductModal;
