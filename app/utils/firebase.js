// const admin = require("firebase-admin");

// // Path to your downloaded service account key JSON file
// const serviceAccount = require("../config/firebase-config.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// exports.sendNotification = async (
//   token,
//   title = "hello",
//   body = "it is testing "
// ) => {
//   try {
//     if (!token || !title || !body) {
//       throw new Error("Invalid parameters provided");
//     }
//     const message = {
//       notification: {
//         title: title,
//         body: body,
//       },
//       token: token, // The device token
//     };

//     const response = await admin.messaging().send(message);
//     console.log("Successfully sent message:", response);
//     return { success: true, data: response };
//   } catch (error) {
//     console.error("Error sending message:", error);
//     return { success: false, data: error };
//   }
// };
// // eWUhjDpCHxwPcxgHlF-x-L:APA91bE-hYhYUP8K0B_HMkCYS5_Rzd8qcarH8lfBh1LkdtGg_zGmI4WIjVznP1xhtH09rFmAZqWTSPJZ9DniYMbaCMMSaMsiB5m7l4NeKKoKzEEetuHionU
