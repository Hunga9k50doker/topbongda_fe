"use client";
import Footer from "@/components/common/Footer";
import React from "react";
interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  return (
    <>
      <header></header>
      <main style={{ minHeight: "100vh" }}>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default PrivateLayout;
