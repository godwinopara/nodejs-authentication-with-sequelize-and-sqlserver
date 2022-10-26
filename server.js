const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./Models");
const userRoutes = require("./Routes/userRoutes");

const app = express();

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const createDbTable = async () => {
  await db.Users.sync();
  console.log("All models were synchronized successfully.");
};

createDbTable();

app.use("/api/users", userRoutes);

const port = 5000;
app.listen(port, () => console.log(`App running on port ${port}`));
