"use client";
import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Box } from "@mui/material";
interface CommonLayoutProps {
  children: React.ReactNode;
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <Box sx={{ height: "40px" }} />
      <main style={{ minHeight: "100vh" }}>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default CommonLayout;
