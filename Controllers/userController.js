const db = require("../Models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const Users = db.Users;

const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = { userName, email, password: await bcrypt.hash(password, 10) };

    const user = await Users.create(data);

    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);

      res.status(201).send(user);
    } else {
      res.status(409).send("Details not Correct");
    }
  } catch (err) {
    console.error(err);
  }
};

// Login Authentication

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = Users.findOne({ email });

    if (user) {
      const validateUserPassword = await bcrypt.compare(
        password,
        user.password
      );

      if (validateUserPassword) {
        let token = jwt.sign({ id: user.id }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        res.cookie("jwt", token, {
          maxAge: 1 * 24 * 60 * 60,
          httpOnly: true,
        });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);

        res.status(201).send(user);
      } else {
        res.status(401).send("Authentication Failed");
      }
    } else {
      res.status(401).send("Authentication Faild");
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { signup, login };
