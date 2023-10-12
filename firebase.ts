"use client";
import { registerFcmTokenAPI, removeFcmTokenAPI } from "@/apis/user_apis";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getAuth } from "firebase/auth";
import {
  FIRE_BASE_API_KEY,
  FIRE_BASE_AUTH_DOMAIN,
  FIRE_BASE_PROJECT_ID,
  FIRE_BASE_STORAGE_BUCKET,
  FIRE_BASE_MESSAGING_SENDER_ID,
  FIRE_BASE_APP_ID,
  FIRE_BASE_MEASUREMENT_ID,
} from "@/constants";

if (typeof navigator === "undefined") {
}

const firebaseConfig = {
  apiKey: FIRE_BASE_API_KEY,
  authDomain: FIRE_BASE_AUTH_DOMAIN,
  projectId: FIRE_BASE_PROJECT_ID,
  storageBucket: FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: FIRE_BASE_MESSAGING_SENDER_ID,
  appId: FIRE_BASE_APP_ID,
  measurementId: FIRE_BASE_MEASUREMENT_ID,
};

let messaging: any;
const app = initializeApp(firebaseConfig);
if (typeof window !== "undefined") {
  // handle "Navigator not defined"
  messaging = getMessaging(app);
}

export const auth = getAuth(app);

export const registerFirebaseNotification = () => {
  const deviceId = getDeviceId();
  getToken(messaging)
    .then((token) => {
      registerFcmTokenAPI({
        _device_id: deviceId,
        fcm_token: token,
        _type_device: "web",
      })
        .then((r) => {})
        .catch((e) => {})
        .finally(() => {
          localStorage.setItem("isNoti", "true");
        });
    })
    .catch((err) => {});
};

export const removeFirebaseNotification = () => {
  const deviceId = getDeviceId();
  getToken(messaging)
    .then(() => {
      removeFcmTokenAPI({
        _device_id: deviceId,
      })
        .then((r) => {})
        .catch((e) => {})
        .finally(() => {
          localStorage.removeItem("isNoti");
        });
    })
    .catch((err) => {});
};

function getDeviceId() {
  if (typeof window !== "undefined") {
    const navigatorInfo = navigator.userAgent;
    // @ts-ignore
    const crypto = window.crypto || window.msCrypto;
    const deviceId = crypto.getRandomValues(new Uint32Array(1))[0];
    return `${navigatorInfo}-${deviceId}`;
  }
}
