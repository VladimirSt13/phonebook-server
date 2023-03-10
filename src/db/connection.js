const { mongoose } = require("mongoose");

mongoose.set("strictQuery", true);

const connectDb = async () => {
  return mongoose.connect(process.env.MONGO_URL);
};

module.exports = {
  connectDb,
};
