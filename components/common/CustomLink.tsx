import React from "react";
import Link from "next/link";

interface CustomLinkProps {
  prefetch?: boolean;
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: any;
  title?: string;
}
const CustomLink = ({
  prefetch,
  href,
  children,
  title,
  className,
  style,
}: CustomLinkProps) => {
  return (
    <Link
      style={{
        ...style,
      }}
      title={title || ""}
      href={href || "#"}
      prefetch={prefetch ?? false}
      className={className ?? ""}
      aria-label={href || "link"}
      // {...id ?{ id : id } : ""}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
