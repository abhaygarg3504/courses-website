import Faq from "../Models/Faqs.js";

async function allFaq(req, res, next) {
  try {
    let data = await Faq.find().sort({ _id: -1 }).limit(5);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json("some error occurred");
  }
}

async function addFaq(req, res) {
  const { question, answer } = req.body;

  try {
    let existingObject = await Faq.findOne({ question });

    if (existingObject) {
      const updatedObject = await Faq.findByIdAndUpdate(
        existingObject._id,
        {
          question,
          answer,
        },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Object updated successfully", updatedObject });
    } else {
      const newObject = await Faq.create({
        question,
        answer,
      });
      res
        .status(201)
        .json({ message: "Object created successfully", newObject });
    }
  } catch (error) {
    console.error("Error creating or updating object:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteFaq(req, res) {
  const { _id } = req.body;
  try {
    const deletedObject = await Faq.findByIdAndDelete(_id);
    res
      .status(200)
      .json({ message: "Object updated successfully", deletedObject });
  } catch (error) {
    console.error("Error creating or updating object:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function editFaq(req, res) {
  const { _id, question, answer } = req.body;
  try {
    const updatedObject = await Faq.findByIdAndUpdate(
      _id,
      {
        question,
        answer,
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

const faqRoutes = { addFaq, allFaq, editFaq, deleteFaq };

export default faqRoutes;
