import mongoose from "mongoose";
import chalk from "chalk";
import { DB_NAME } from "../constant.js";

export const connectDb = async () => {
  try {
    const connection_instance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      chalk.bgGreen(
        `SocioGram successfully Connected !! `,
        connection_instance.connection.host
      )
    );
  } catch (error) {
    console.error(chalk.bgRed(`Error connecting SocioGram!! `, error));
    process.exit(1);
  }
};
