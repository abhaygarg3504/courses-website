import express from "express";
const router = express.Router();
import Courses from "../Models/Course.js";

router.get("/api/sidebar/data", async (req, res, next) => {
  let intake = "";
  const university = req.query.University;
  try {
    let data = await Courses.aggregate([
      {
        $match: { Institute_Name: university },
      },
      {
        $project: {
          Course_Name: 1,
          Institute_Name: 1,
          Intakes: 1,
          Country: 1,
          Ranking: 1,
          Full_Address: 1,
          Yearly_Tuition_Fees: 1,
          Application_Deadline: 1,
        },
      },
      {
        $sort: {
          score: 1,
          Course_Name: 1,
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({messsage : "Some error occurred"});
  }
});

export default router;
