// Import Firebase scripts
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyStvTiBjDvzyE-4WXVw18FnXLa8_0Qac",
  authDomain: "test-b64ed.firebaseapp.com",
  projectId: "test-b64ed",
  storageBucket: "test-b64ed.appspot.com",
  messagingSenderId: "815903072205",
  appId: "1:815903072205:web:f4aed8ed09e9f7ba59ae84",
  measurementId: "G-DLXFK5JXNF",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // Replace with your app's logo or an appropriate image
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
