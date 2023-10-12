import React from "react";
import PrivateLayout from "@/layouts/PrivateLayout";

interface LayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

const Layout = ({ children, header }: LayoutProps) => {
  return (
    <PrivateLayout>
      {header}
      {children}
    </PrivateLayout>
  );
};

export default Layout;
