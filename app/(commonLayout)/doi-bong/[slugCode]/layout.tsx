import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

const Layout = ({ children, header }: LayoutProps) => {
  return (
    <>
      {header}
      {children}
    </>
  );
};

export default Layout;
