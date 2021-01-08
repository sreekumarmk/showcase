if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("dotenv").config();
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.set("views", __dirname + "/views");

app.use(expressLayouts);
app.use(express.static("public"));
app.use(indexRouter);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  `Server listening on port ${PORT}`;
});
