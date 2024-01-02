const express = require("express");
const dotenv = require("dotenv");

async function main() {
  const app = express();
  dotenv.config();
  app.listen(process.env.PORT, () => {
    console.log(`App Run On PORT ${process.env.PORT} `);
  });
}
main();
