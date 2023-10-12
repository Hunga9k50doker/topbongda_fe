import React, { useContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase";
import { googleAuthAPI, facebookAuthAPI } from "@/apis/user_apis";
import { toast } from "react-toastify";
import { setCookies } from "@/utils";
import { useLocalStorage } from "react-use";

interface AuthProps {
  user: any;
  googleSignIn: () => void;
  facebookSignIn: () => void;
}

export const AuthContext = React.createContext<AuthProps>({
  user: null,
  googleSignIn: () => {},
  facebookSignIn: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(null);
  const [stoVal] = useLocalStorage<any>("url-search", "/");

  const handleLoggin = (res: any) => {
    if (res.data.ok) {
      setCookies("jwt", res.data.access);
      setCookies("refresh", res.data.refresh);
      toast.success(`Đăng nhập thành công, chào mừng bạn đến với topbongda!`);
      if (stoVal) {
        window.location.href = stoVal;
      } else {
        window.location.reload();
      }
    } else {
      toast.warning(res.data.msg);
    }
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result: any) => {
        googleAuthAPI({
          access: result._tokenResponse.oauthAccessToken,
          emailVerified: result.user.emailVerified,
        })
          .then((res) => {
            handleLoggin(res);
          })
          .catch((err) => toast.error(err.msg));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const facebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result: any) => {
        facebookAuthAPI({
          access: result._tokenResponse.oauthAccessToken,
          emailVerified: result.user.emailVerified,
        })
          .then((res) => {
            handleLoggin(res);
          })
          .catch((err) => toast.error(err.msg));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, facebookSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
