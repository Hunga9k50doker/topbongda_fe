"use client";
import { initializeApp } from "firebase/app";
import { onMessage } from "firebase/messaging";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import {
  FIRE_BASE_API_KEY,
  FIRE_BASE_AUTH_DOMAIN,
  FIRE_BASE_PROJECT_ID,
  FIRE_BASE_STORAGE_BUCKET,
  FIRE_BASE_MESSAGING_SENDER_ID,
  FIRE_BASE_APP_ID,
  FIRE_BASE_MEASUREMENT_ID,
} from "@/constants";

if (typeof window !== "undefined") {
  // Initialize the Firebase app in the service worker by passing the generated config
  const firebaseApp = initializeApp({
    apiKey: FIRE_BASE_API_KEY,
    authDomain: FIRE_BASE_AUTH_DOMAIN,
    projectId: FIRE_BASE_PROJECT_ID,
    storageBucket: FIRE_BASE_STORAGE_BUCKET,
    messagingSenderId: FIRE_BASE_MESSAGING_SENDER_ID,
    appId: FIRE_BASE_APP_ID,
    measurementId: FIRE_BASE_MEASUREMENT_ID,
  });
  // Retrieve firebase messaging
  const messaging = getMessaging(firebaseApp);

  onBackgroundMessage(messaging, function (payload) {
    console.log("Received background message ", payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  });

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // ...
  });
} else {
  // Handle the case where navigator is not available
}
