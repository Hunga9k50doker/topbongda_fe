import { createSlice } from "@reduxjs/toolkit";
import { cookies } from "next/headers";
import { getCookies, setCookies } from "@/utils";
export const initState = {
  theme: getCookies("theme") || "light",
};

const systemSlice = createSlice({
  name: "systemStore",
  initialState: initState,
  reducers: {
    updateTheme: (state, action) => {},
  },
});

export const { updateTheme } = systemSlice.actions;
export default systemSlice;
