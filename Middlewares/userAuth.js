// importing modules
const db = require("../Models");

const Users = db.Users;

const saveUser = async (req, res, next) => {
  try {
    const userName = await Users.findOne({
      where: {
        userName: req.body.userName,
      },
    });

    if (userName) {
      res.json(409).send("Username already taken");
    }

    const email = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (email) {
      res.json(409).send("Email already taken");
    }

    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports = { saveUser };
