interface LogoImgProps {
  width?: number;
  height?: number;
  alt?: string;
  src?: string;
  className?: string;
}

function LogoImage({
  alt = "logo",
  width = 36,
  height = 36,
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
