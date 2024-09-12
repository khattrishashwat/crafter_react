// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import Swal from "sweetalert2";

// const firebaseConfig = {
//   apiKey: "AIzaSyA0f_S9uvgaTyU1Q14Xlj7-JhuD-yWhp90",
//   authDomain: "crafter-bbedf.firebaseapp.com",
//   projectId: "crafter-bbedf",
//   storageBucket: "crafter-bbedf.appspot.com",
//   messagingSenderId: "624141160152",
//   appId: "1:624141160152:web:d816713c6cb98a436c91ad",
//   measurementId: "G-59318ZN6Q9",
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/firebase-messaging-sw.js")
//     .then((registration) => {
//       console.log("Service Worker registered:", registration);

//       // Request permission and get token
//       getToken(messaging, {
//         vapidKey:
//           "BBN-PlunpDw8m0iblLHO5m1_MXxaT5yMC2SqfwLh0gHrxhYPC5dXFl7N97KHwz-VKxUa0zYTcIuoxv4_xqG9b20",
//       })
//         .then((currentToken) => {
//           if (currentToken) {
//             console.log("Current token:", currentToken);
//             // Send the token to your server to handle FCM or subscribe to topics
//           } else {
//             console.log(
//               "No registration token available. Request permission to generate one."
//             );
//             // Show permission request UI
//           }
//         })
//         .catch((err) => {
//           console.error("Error getting token:", err);
//         });

//       // Handle incoming messages
//       onMessage(messaging, (payload) => {
//         console.log("Message received:", payload);
//         // Customize how you want to handle incoming messages
//         // For example, display a notification using Swal
//         Swal.fire({
//           title: "New Message!",
//           text: payload.notification.body,
//           icon: "info",
//           confirmButtonText: "OK",
//         });
//       });
//     })
//     .catch((error) => {
//       console.error("Service Worker registration failed:", error);
//     });
// }


// export { messaging, getToken, onMessage };