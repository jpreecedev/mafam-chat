/* eslint-disable */

try {
  importScripts("https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js");
  importScripts(
    "https://www.gstatic.com/firebasejs/7.7.0/firebase-messaging.js"
  );

  firebase.initializeApp({
    messagingSenderId: "411268033916",
    projectId: "mafam-74c63"
  });

  const messaging = firebase.messaging();

  // If you would like to customize notifications that are received in the
  // background (Web app is closed or not in browser focus) then you should
  // implement this optional method.
  // [START background_handler]
  messaging.setBackgroundMessageHandler(function(payload) {
    console.log("Handling background message ", payload);

    return self.registration.showNotification(payload.data.title, {
      body: payload.data.body,
      icon: payload.data.icon,
      tag: payload.data.tag,
      data: payload.data.link
    });
  });

  self.addEventListener("notificationclick", function(event) {
    event.notification.close();
    event.waitUntil(self.clients.openWindow(event.notification.data));
  });

  // [END background_handler]
} catch (error) {
  console.log(error);
}
