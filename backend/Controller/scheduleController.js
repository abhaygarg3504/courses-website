import Call from "../Models/Schedules.js";
import User from "../Models/User.js";
import Cart from "../Models/Cart.js";
import emailFunctions from "./emailController.js";

export default async function scheduleController(req, res, next) {
  const { date, shift, country, number, foreignCountry, reason } =
    req.body.formData;
  try {
    if (req.isAuthenticated()) {
      const user = await User.findOne({ email: req.session.passport.user });
      if (user) {
        if (!user.number && number) {
          await User.updateOne(
            { _id: user._id },
            { $set: { number: number, country: country || "India" } }
          );
        }
        const pastSchedule = await Call.findOne({ userId: user._id,reason:reason});
        if (pastSchedule) {
          await Call.deleteOne({ userId: user._id ,reason:reason});
        }
        const newSchedule = await Call.create({
          userId: user._id,
          scheduledAt: date,
          shift: shift,
          country: user.country ? user.country : country,
          number: user.number ? user.number : number,
          foreignCountry,
          reason,
        });
        res.status(200).json({ message: "Call scheduled." });
      } else {
        res.status(400).json({ error: "some error occurred" });
      }
    } else {
      const newSchedule = await Call.create({
        scheduledAt: date,
        shift: shift,
        country: country,
        number: number,
        foreignCountry,
        reason,
      });
      res.status(200).json({ message: "Call scheduled." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "some error occurred" });
  }
}
