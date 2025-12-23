import User from "../Models/User.js";

async function userList(req, res) {
  try {
    const user = await User.find().sort({ username: 1 }).limit(100);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("some error occurred");
  }
}

async function editUser(req, res) {
  const { _id, username, email, number, country } = req.body;
  try {
    const updatedObject = await User.findByIdAndUpdate(
      _id,
      {
        username,
        email,
        number,
        country,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Object updated successfully", updatedObject });
  } catch (error) {
    console.error("Error creating or updating object:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function userInfo(req, res, next) {
  res.send(req.session.passport.user);
}

async function addNumber(req, res, next) {
  const { country, number } = req.body;

  const user = await User.findOne({ email: req.session.passport.user });
  if (user.number === undefined) {
    try {
      await User.updateOne(
        { email: req.session.passport.user },
        { $set: { number: number, country: country } },
        { upsert: true }
      );
      res.status(200).json({ message: "User updated." });
    } catch (error) {
      res.status(400).json({ message: "OOPs some error occured." });
    }
  } else {
    res.status(409).json({ message: "Already exist" });
  }
}

async function userContact(req, res, next) {
  const user = await User.findOne({ email: req.session.passport.user });
  if (user.number) {
    res.status(200).json({ success:true});
  } else {
    res.status(200).json({ success: false });
  }
}

async function searchUser(req, res) {
  const query = req.query.q;
  let array = query.split(" ");
  if (array.length > 1) {
    const query1 = req.query.q;
    const user = await User.aggregate([
      {
        $match: {
          $text: { $search: query1 },
        },
      },
      {
        $project: {
          username: 1,
          email: 1,
          number: 1,
          score: { $meta: "textScore" },
        },
      },
      {
        $sort: {
          score: -1,
        },
      },
    ]).limit(100);
    res.send(user);
  } else {
    const query2 = new RegExp("\\b" + req.query.q, "gi");

    try {
      const user = await User.aggregate([
        {
          $match: {
            $or: [
              { username: { $regex: query2 } },
              { email: { $regex: query2 } },
              { number: { $regex: query2 } },
            ],
          },
        },
        {
          $sort: {
            username: 1,
            email: 1,
          },
        },
      ]).limit(1000);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send("some error occurred");
    }
  }
}

const userController = {
  userList,
  editUser,
  searchUser,
  userInfo,
  userContact,
  addNumber,
};

export default userController;
