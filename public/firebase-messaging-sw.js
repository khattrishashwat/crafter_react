// importScripts(
//   "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
// );

// const firebaseConfig = {
//   apiKey: "AIzaSyA0f_S9uvgaTyU1Q14Xlj7-JhuD-yWhp90",
//   authDomain: "crafter-bbedf.firebaseapp.com",
//   projectId: "crafter-bbedf",
//   storageBucket: "crafter-bbedf.appspot.com",
//   messagingSenderId: "624141160152",
//   appId: "1:624141160152:web:d816713c6cb98a436c91ad",
//   measurementId: "G-59318ZN6Q9",
// };

// // firebase.initializeApp(firebaseConfig);

// // const messaging = firebase.messaging();

// // messaging.onBackgroundMessage((payload) => {
// //   console.log(
// //     "[firebase-messaging-sw.js] Received background message ",
// //     payload
// //   );
// //   const notificationTitle = payload.notification.title;
// //   const notificationOptions = {
// //     body: payload.notification.body,
// //     icon: "/firebase-logo.png",
// //   };

// //   self.registration.showNotification(notificationTitle, notificationOptions);
// // });
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// // Check if Messaging is supported
// if (firebase.messaging.isSupported()) {
//   const messaging = firebase.messaging();

//   messaging.onBackgroundMessage((payload) => {
//     console.log(
//       "[firebase-messaging-sw.js] Received background message ",
//       payload
//     );
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//       body: payload.notification.body,
//       icon: "/firebase-logo.png",
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
//   });
// } else {
//   console.log("Firebase Messaging is not supported in this browser.");
//   // Handle or notify the user about unsupported browser
// }

// self.addEventListener("message", (e) => {
//   console.log("Message received in service worker:", e.data);
//   // Process the message as needed
// });
