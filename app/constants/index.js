exports.DATABASE = "brg_delivery";

exports.ENVIRONMENTS = {
  production: "production",
  dev: "development",
  staging: "staging",
};

exports.ROLES = {
  ADMIN: "admin",
  BUSINESS: "business",
  CUSTOMER: "customer",
};

exports.SELL_BOOKING_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  CANCELED: "canceled",
  SOLD: "sold",
};

exports.BOOKING_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  CANCELED: "canceled",
  SOLD: "sold",
};

exports.SERVICE_TYPE = {
  HAIRCUTTING: "saloon_hair_cutting",
  HAIRCOLORING: "saloon_hair_coloring",
  HAIRSTYLING: "saloon_hair_styling",

  SPAMASSAGE: "spa_massage",
  SPAHANDMASSAGE: "spa_hand_massage",
  SPAFOOTMASSAGE: "spa_foot_massage",

  HOTELROOM: "hotel_room",
  HOTELPARKING: "hotel_parking",
  HOTELFOOD: "hotel_food",
};

exports.BUSINESS_TYPES = {
  SPA: "spa",
  SALOON: "saloon",
  HOTEL: "hotel",
};

// exports.BOOKING_STATUS = ["PENDING", "CONFIRMED", "CANCELLED"];

exports.DAYS_OF_THE_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
