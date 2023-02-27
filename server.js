const express = require("express");
const app = express();
const router = require("./routers/UserControllersRoutes");
const postroutes = require("./routers/PostControllersRoutes")
const actionuserroutes = require("./routers/UserActionControllersRoutes")
const mongoose = require("mongoose");

require("dotenv").config()

app.use(express.json());

app.use("/auth", router)
app.use("/posts", postroutes)
app.use("/users", actionuserroutes)

mongoose
  .connect(
process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(process.env.PORT || 3000, () => console.log("Servidor Rodando"));
  })
  .catch((error) => console.log(`${error} did not connect`));
