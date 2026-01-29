import mongoose from "mongoose";
import "dotenv/config";

const db_url = process.env.MONGODB_URL;

export const connect = async () => {
  await mongoose
    .connect(db_url)
    .then(() => {
      console.log("DB is connected");
    })
    .catch((e) => {
      console.log(e);
    });
};
