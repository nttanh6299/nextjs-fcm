// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyC6QBNagigB9fwIro7pjCN9DASggyLC-jQ",
  authDomain: "fcm-demo-201e6.firebaseapp.com",
  projectId: "fcm-demo-201e6",
  storageBucket: "fcm-demo-201e6.appspot.com",
  messagingSenderId: "128130080479",
  appId: "1:128130080479:web:400622beea71c8b129536a",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
