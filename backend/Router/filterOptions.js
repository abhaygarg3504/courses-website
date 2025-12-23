import express from "express";
const router = express.Router();
import Courses from "../Models/Course.js";

router.get("/api/filter", async (req, res, next) => {
  const country = req.query.country;
  const course = req.query.course;
  const year = req.query.year;
  let searchQuery = [];

  var regexPattern = course
    .split(" ")
    .map((word) => `(?:${word.split("").join("[\\w]*")})`)
    .join(".*");

  if (country.length > 0 && course.length) {
    searchQuery = [
      { Course_Name: { $regex: regexPattern, $options: "i" } },
      { Country: country },
    ];
  } else if (country.length > 0) {
    searchQuery = [{ Country: country }];
  } else if (course.length > 0) {
    searchQuery = [{ Course_Name: { $regex: regexPattern, $options: "i" } }];
  }

  var pipeline = [
    {
      $match: {
        $and: searchQuery,
      },
    },
    {
      $addFields: {
        numericValue: {
          $cond: {
            if: { $eq: [{ $type: "$National_Ranking" }, "string"] },
            then: {
              $toInt: {
                $arrayElemAt: [{ $split: ["$National_Ranking", " "] }, 0],
              },
            },
            else: {
              $cond: {
                if: { $eq: [{ $type: "$QS_Ranking" }, "string"] },
                then: {
                  $toInt: {
                    $arrayElemAt: [{ $split: ["$QS_Ranking", " "] }, 0],
                  },
                },
                else: {
                  $cond: {
                    if: { $eq: [{ $type: "$World_Ranking" }, "string"] },
                    then: {
                      $toInt: {
                        $arrayElemAt: [{ $split: ["$World_Ranking", " "] }, 0],
                      },
                    },
                    else: 9999,
                  },
                },
              },
            },
          },
        },
      },
    },
    { $sort: { numericValue: 1 } },
    {
      $project: {
        Full_Address: 1,
        Course_Name: 1,
        Institute_Name: 1,
        Duration: 1,
        Yearly_Tuition_Fees: 1,
        National_Ranking: 1,
        QS_Ranking: 1,
        World_Ranking: 1,
        Institute_Logo: 1,
        Application_Fees: 1,
        Website_Link: 1,
        Country: 1,
        Application_Deadline: 1,
      },
    },
  ];

  try {
    const data = await Courses.aggregate(pipeline).limit(25000);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json("some error occurred");
  }
});

export default router;
