const express = require("express");
const dotenv = require("dotenv");
const { allRoutes } = require("./src/routes");

async function main() {
  const app = express();
  dotenv.config();
  require("./src/config/mongoose.config");
  //middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(allRoutes);

  app.listen(process.env.PORT, () => {
    console.log(`App Run On PORT ${process.env.PORT} `);
  });
}
main();
