// "use server";
// import React from "react";
// import { getMyProfileAPI } from "@/apis/user_apis";
// import { cookies } from "next/headers";
// import { store } from "@/store";
// import { updateUser } from "@/reducers/userSlice";
// import Header from "./Header";
// const HeaderSSR = async () => {
//   //   const valCookies = cookies().get("jwt")?.value;
//   //   const user = await getMyProfileAPI(valCookies)
//   //     .then((r) => {
//   //       store.dispatch(updateUser(r.data));
//   //       return r.data;
//   //     })
//   //     .catch((e) => {});

//   return <Header />;
// };

// export default HeaderSSR;
