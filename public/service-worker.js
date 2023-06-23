// Service worker registration
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        // Other assets to cache...
      ]);
    })
  );
});



// Web push notification handling
self.addEventListener('push', function(event) {
  var notificationData = {};

  if (event.data) {
    notificationData = event.data.json();
  }

  var options = {
    body: notificationData.body,
    icon: notificationData.icon,
    // Other notification options...
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  // Handle notification click event, e.g., open a specific URL

  // You can use event.notification.data to access custom data associated with the notification
});
