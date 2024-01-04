import React from "react";

interface LogoImgProps {
  width?: number;
  height?: number;
  alt?: string;
  src?: string;
  className?: string;
}

function LogoImage({
  alt = "logo",
  width = undefined,
  height = undefined,
  src = "/assets/images/logo.svg",
  className = "",
}: LogoImgProps) {
  return (
    <img
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={className}
    />
  );
}

export default LogoImage;
