const Pusher = require("pusher");

const pusherConfig = new Pusher({
  appId: "1894626",
  key: "bd3579587f0d4698df0a",
  secret: "6373c52c6cf75c67888d",
  cluster: "ap2",
  useTLS: true,
});

exports.pusher = (channel, EventName, data = null) => {
  return pusherConfig
    .trigger(channel, EventName, data ? { ...data } : null)
    .then((response) => {})
    .catch((error) => {
      console.error("Error triggering Pusher event:", error);
    });
};
