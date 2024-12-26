"use client";
import React, {
  FC,
  Fragment,
  ImgHTMLAttributes,
  useEffect,
  useState,
} from "react";

type Props = {} & ImgHTMLAttributes<HTMLImageElement>;

const AppImage: FC<Props> = ({ src, className, ...rest }) => {
  const [uri, setUri] = useState("");
  const [retry, setRetry] = useState(true);

  useEffect(() => {
    if (src) setUri(src);
  }, [src]);

  const onError = () => {
    if (!uri || !retry) {
      return;
    }
    if (uri?.includes("/products/images")) {
      setUri(`localhost:8000/images/products/thumbnails/${src}`);
      setRetry(false);
    } else {
      setUri(`localhost:8000/images/products/images/${src}`);
    }
  };
  return <img {...rest} src={uri} className={className} onError={onError} />;
};

export default AppImage;
