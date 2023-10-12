"use client";
import React, { memo } from "react";
import { store } from "@/store";
import { updateUser } from "@/reducers/userSlice";
import { useEffectOnce } from "react-use";
import { UserModel } from "@/models/user_model";

interface AuthProps {
  userData: UserModel;
}
const Auth = ({ userData }: AuthProps) => {
  useEffectOnce(() => {
    store.dispatch(updateUser(userData));
  });
  return <></>;
};

export default memo(Auth);
