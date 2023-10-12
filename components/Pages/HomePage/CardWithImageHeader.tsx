import React from "react";
import Image, { StaticImageData } from "next/image";
import Card from "@mui/material/Card";

interface CardWithImageHeaderProps {
  title: string;
  bgImg: string | StaticImageData;
  className?: string;
  children?: React.ReactNode;
}

function CardWithImageHeader({
  title,
  bgImg,
  className,
  children,
  ...props
}: CardWithImageHeaderProps) {
  return (
    <Card className={className}>
      <div className="w-full h-20 overflow-hidden relative">
        {bgImg && (
          <Image
            alt=""
            className="bgImg no-drag no-select z-0"
            src={bgImg}
            placeholder="blur"
            quality={75}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />
        )}
        <div className="absolute bg-black/60 z-10 inset-0" />
        <h2 className="z-20 absolute bottom-0 ml-4 mb-4 text-white font-bold heading-font">
          {title}
        </h2>
      </div>
      <div>{children}</div>
    </Card>
  );
}

export default CardWithImageHeader;
