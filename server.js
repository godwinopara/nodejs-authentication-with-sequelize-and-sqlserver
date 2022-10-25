const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./Models");

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

// const createUser = async () => {
//   const user = {
//     userName: "john",
//     email: "johndoe@gmail.com",
//     password: "johnpassword",
//   };
//   const jane = await Users.create(user);
//   console.log("Jane's auto-generated ID:", jane.id);
// };

// createUser();

const port = 5000;
app.listen(port, () => console.log(`App running on port ${port}`));
