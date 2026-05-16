const notifications = [
  {
    id: 1,
    type: "Placement",
    message: "Google hiring",
    timestamp: "2026-04-22T17:51:18",
    read: false,
  },
  {
    id: 2,
    type: "Result",
    message: "Mid sem results",
    timestamp: "2026-04-22T17:50:54",
    read: false,
  },
  {
    id: 3,
    type: "Event",
    message: "Tech fest",
    timestamp: "2026-04-20T10:00:00",
    read: false,
  },
  {
    id: 4,
    type: "Placement",
    message: "Microsoft hiring",
    timestamp: "2026-04-21T12:00:00",
    read: false,
  },
  {
    id: 5,
    type: "Result",
    message: "Project review",
    timestamp: "2026-04-19T09:00:00",
    read: false,
  },
  {
    id: 6,
    type: "Event",
    message: "Farewell",
    timestamp: "2026-04-18T18:00:00",
    read: false,
  },
];

const priorityWeights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function calculatePriority(notification) {
  const typeWeight = priorityWeights[notification.type];

  const currentTime = new Date().getTime();
  const notificationTime = new Date(notification.timestamp).getTime();

  const recencyScore =
    1 / ((currentTime - notificationTime) / (1000 * 60 * 60) + 1);

  return typeWeight * 100 + recencyScore;
}

function getTopNotifications(notifications, limit = 10) {
  return notifications
    .filter((notification) => !notification.read)
    .sort(
      (a, b) => calculatePriority(b) - calculatePriority(a)
    )
    .slice(0, limit);
}

const topNotifications = getTopNotifications(notifications);

console.log("Top Priority Notifications:\n");

topNotifications.forEach((notification, index) => {
  console.log(
    `${index + 1}. [${notification.type}] ${notification.message}`
  );
});