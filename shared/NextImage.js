// components/Image.js

import Image from "next/image";

const NextImage = ({ src, alt, width, height, defaultSrc, ...props }) => {
  const defaultWidth = 300;
  const defaultHeight = 200;

  // Use the provided image source, or the default source if the provided one is invalid
  const imageUrl = src || defaultSrc || "/images/default-user.png";
  const altValue =
    alt ||
    imageUrl
      .split("/")
      .pop()
      .replace(/\.[^/.]+$/, "");
  return (
    <Image
      src={imageUrl}
      alt={altValue}
      width={width || defaultWidth}
      height={height || defaultHeight}
      loading="lazy"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAR0lEQVR42u3PQREAMAgAoJluEU1oDs3g14MGxM/qd0CIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiGwM4mCKF4c/6xAAAAAASUVORK5CYII="
      {...props}
    />
  );
};

export default NextImage;
