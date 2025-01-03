"use client";
import React, {
  FC,
  Fragment,
  ImgHTMLAttributes,
  useEffect,
  useState,
} from "react";

type Props = { isThumbnail?: boolean } & ImgHTMLAttributes<HTMLImageElement>;

const AppImage: FC<Props> = ({ src, className, isThumbnail, ...rest }) => {
  const [uri, setUri] = useState("");

  useEffect(() => {
    if (src) setUri(src);
  }, [src]);

  const onError = () => {
    if (!uri) {
      return;
    }
    if (isThumbnail) {
      setUri(`http://localhost:8000/images/products/thumbnails/${src}`);
    } else {
      setUri(`http://localhost:8000/images/products/images/${src}`);
    }
  };
  if (uri) {
    return <img {...rest} src={uri} className={className} onError={onError} />;
  }
};

export default AppImage;
