import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { AppButton } from "../appButton";
import Trash from "../../../../public/svg/Trash.svg";
import ImagePlaceholder from "../../../../public/svg/image-placeholder.svg";
import CheckSquare from "../../../../public/svg/CheckSquare.svg";
import UploadSimple from "../../../../public/svg/UploadSimple.svg";
import AppImage from "@/components/organisms/appImage";

interface ImageItem {
  id: number;
  url: string | null;
  isThumbnail: boolean;
  imageObject?: ImageFileObject;
  preview?: boolean;
}

export interface ImageFileObject extends Blob {
  name: string;
  size: number;
  type: string;
}

const helperColor = {
  base: "fill-light-primary-text-subtitle stroke-light-primary-text-subtitle text-light-primary-text-subtitle text-body-12 ",
  disabled:
    "fill-light-primary-text-caption stroke-light-primary-text-caption text-light-primary-text-subtitle text-body-12",
  success:
    "fill-dark-success-text-negative stroke-dark-success-text-negative text-dark-success-text-negative-subtle text-body-12",
  failure:
    "fill-dark-error-text-negative stroke-dark-error-text-negative text-dark-error-text-negative text-body-12 ",
};

interface AppFileUploaderProps {
  hasError?: boolean;
  onChange?: (images: Array<ImageItem>) => void;
  helperText?: string;
  defaultValue?: Array<string>;
  defaultThumbnail?: string;
  isDisabled?: boolean;
}

const AppFileUploader: React.FC<AppFileUploaderProps> = ({
  helperText,
  hasError,
  onChange,
  defaultValue,
  defaultThumbnail,
  isDisabled = false,
}) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImages(
      Array.from({ length: 5 }, (_, index) => {
        const defaultImageUrl = defaultValue?.[index] || null;
        if (defaultThumbnail && index === 0) {
          return {
            id: index,
            url: defaultThumbnail,
            isThumbnail: true,
          };
        }
        return {
          id: index,
          url: defaultImageUrl,
          isThumbnail: false,
        };
      })
    );
  }, [defaultValue, defaultThumbnail]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    if (e.target.files) {
      const file = e.target.files[0];
      const res = URL.createObjectURL(file);

      setImages((prevImages) => {
        const nextAvailableIndex = prevImages.findIndex((img) => !img.url);
        return prevImages.map((img, index) =>
          index === nextAvailableIndex
            ? { ...img, url: res, imageObject: file, preview: true }
            : img
        );
      });
    }
  };

  const handleDelete = (id: number) => {
    if (isDisabled) return;
    setImages((prevImages) =>
      prevImages.map((img) =>
        img.id === id
          ? { ...img, url: null, isThumbnail: false, imageObject: undefined }
          : img
      )
    );
  };

  const handleSetThumbnail = (id: number) => {
    if (isDisabled) return;
    setImages((prevImages) =>
      prevImages.map((img) => ({ ...img, isThumbnail: img.id === id }))
    );
  };

  useEffect(() => {
    const filledImages = images.filter((item) => item.url !== null);

    const hasThumbnail = images.some((img) => img.isThumbnail);
    if (!hasThumbnail && filledImages.length > 0) {
      setImages((prevImages) =>
        prevImages.map((img, index) =>
          index === 0
            ? { ...img, isThumbnail: true }
            : { ...img, isThumbnail: false }
        )
      );
    }

    onChange && onChange(filledImages);
  }, [images]);

  const renderHelperStyle = () => {
    if (hasError) return helperColor.failure;
    return helperColor.base;
  };

  const isUploadDisabled =
    isDisabled || images.every((img) => img.url !== null);

  return (
    <div className="space-y-5 flex flex-col justify-between max-w-72 w-full">
      <div className="text-subtitle-14 text-light-primary-text-title">
        تصاویر محصول
      </div>

      <div>
        {images.map((image) => (
          <div
            key={image.id}
            className="flex justify-between items-center w-full p-1"
          >
            <div className="flex justify-center items-center">
              <div
                className={`w-14 h-14 flex items-center justify-center overflow-hidden border ${
                  image.isThumbnail
                    ? "border-blue-500 border-[2.5px]"
                    : "border-gray-300"
                } ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() =>
                  !isDisabled && image.url && handleSetThumbnail(image.id)
                }
              >
                {image.url ? (
                  <AppImage
                    src={image.url}
                    alt={image.url ?? ""}
                    isThumbnail={image.isThumbnail}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <ImagePlaceholder />
                )}
              </div>
              {image.imageObject && (
                <p
                  title={image.imageObject.name}
                  className="truncate max-w-40 text-light-primary-text-title text-subtitle-14"
                  dir="ltr"
                >
                  {image.imageObject.name}
                </p>
              )}
            </div>
            <div className="flex justify-center items-center gap-1">
              {image.isThumbnail && <CheckSquare />}
              <div
                className={`${
                  !image.url || isDisabled
                    ? "pointer-events-none opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() => image.url && handleDelete(image.id)}
              >
                <Trash />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-start space-y-2 w-full">
        <input
          hidden
          ref={fileRef}
          type="file"
          onChange={onSelectFile}
          disabled={isDisabled}
        />
        <AppButton
          text="آپلود فایل تصویر"
          variant="primary"
          outline
          fullWidth
          onClick={() => !isDisabled && fileRef.current?.click()}
          isDisabled={isUploadDisabled}
          iconRight={(className) => <UploadSimple className={className} />}
        />
        {helperText && (
          <span className={`${renderHelperStyle()}`}>{helperText}</span>
        )}
      </div>
    </div>
  );
};

export default AppFileUploader;

/////REACT_APP_BASE_URL=http://localhost:8000
