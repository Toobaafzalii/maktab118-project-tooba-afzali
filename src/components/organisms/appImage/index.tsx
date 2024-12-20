"use client";
import React, { FC, ImgHTMLAttributes, useState } from "react";

type Props = {
  isThumbnail?: boolean;
} & ImgHTMLAttributes<HTMLImageElement>;

const AppImage: FC<Props> = ({ src, className, isThumbnail, ...rest }) => {
  const [uri, setUri] = useState(src);
  const onError = () => {
    if (!uri?.includes("https://")) {
      setUri(
        `http://localhost:8000/images/products/${
          isThumbnail ? "thumbnails" : "images"
        }/${uri}`
      );
    }
  };
  return <img {...rest} src={uri} className={className} onError={onError} />;
};

export default AppImage;
