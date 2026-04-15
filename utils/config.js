require("dotenv").config();

module.exports = {
  baseUrl: process.env.BASE_URL,
  key: process.env.CONSUMER_KEY,
  secret: process.env.CONSUMER_SECRET,
};
