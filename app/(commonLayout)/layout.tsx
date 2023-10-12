import CommonLayout from "@/layouts/CommonLayout";

import React from "react";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <CommonLayout>{children}</CommonLayout>;
};

export default Layout;
