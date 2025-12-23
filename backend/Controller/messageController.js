import Message from "../Models/Messages.js";
import emailFunctions from "./emailController.js";

async function message(req, res, next) {
  const { email, name, message, subject, number } = req.body;
  try {
    await emailFunctions.messagesEmail(req.body);
    await Message.create({
      email: email,
      name: name,
      contact: number,
      subject: subject,
      message: message,
    });
    res.status(200).json({ message: "message sent" });
  } catch (error) {
    res.status(400).json({ message: "OOPS some error occured." });
  }
}

async function getMessages(req, res, next) {
  const multiplier = req.query.multiplier;
  try {
    const messaages = await Message.find().sort({ _id: -1 }).limit(multiplier);
    res.status(200).send(messaages);
  } catch (error) {
    res.status(400).send("some error occurred");
  }
}

const messageFuctions = { message, getMessages };
export default messageFuctions;
