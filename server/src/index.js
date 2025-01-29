import chalk from "chalk";
import { connectDb } from "./db/index.js";
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3000; 

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`Server running at port ${port} 🎉`));
    });
  })
  .catch((error) => {
    console.error(chalk.red(`Server error: `, error));
  });
