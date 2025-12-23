import Courses from "../Models/Course.js";

async function courseData(req, res, next) {
  let id = req.params.id;
  try {
    let data = await Courses.findById(id);
    const similarCourse = await similarCourses(
      data.Course_Name,
      data.Institute_Name,
      data._id
    );
    res
      .status(200)
      .json({
        course: data,
        courses: similarCourse.courses,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "some error occurred" });
  }
}

async function allCourses(req, res, next) {
  try {
    const data = await Courses.find().countDocuments();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "some error occurred" });
  }
}

async function addCourse(req, res, next) {
  const {
    Country,
    URL,
    Institute_Name,
    Institut_Logo,
    Full_Address,
    Ranking,
    Website_Link,
    Course_Name,
    Intakes,
    Duration,
    Campus,
    Course_Url,
    Yearly_Tuition_Fees,
    Application_Fees,
    Application_Deadline,
    PTE_Overall,
    PTE_No_Bands_Less_Than,
    TOEFL_iBT_Overall,
    TOEFL_iBT_no_Bands_Less_Than,
    IELTS_Overall,
    IELTS_no_Band_Less_Than,
    GRE_Score,
    GMAT_Score,
    ACT_Score,
    SAT_Score,
    DET_Score,
    GPA,
    Remarks,
  } = req.body;

  try {
    let existingObject = await Courses.findOne({
      Course_Name,
      Full_Address,
      Institute_Name,
      Ranking,
    });

    if (existingObject) {
      const updatedObject = await Courses.findByIdAndUpdate(
        existingObject._id,
        {
          Country,
          URL,
          Institute_Name,
          Institut_Logo,
          Full_Address,
          Ranking,
          Website_Link,
          Course_Name,
          Intakes,
          Duration,
          Campus,
          Course_Url,
          Yearly_Tuition_Fees,
          Application_Fees,
          Application_Deadline,
          PTE_Overall,
          PTE_No_Bands_Less_Than,
          TOEFL_iBT_Overall,
          TOEFL_iBT_no_Bands_Less_Than,
          IELTS_Overall,
          IELTS_no_Band_Less_Than,
          GRE_Score,
          GMAT_Score,
          ACT_Score,
          SAT_Score,
          DET_Score,
          GPA,
          Remarks,
        },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Object updated successfully", updatedObject });
    } else {
      const newObject = await Courses.create(
        {
          Country,
          URL,
          Institute_Name,
          Institut_Logo,
          Full_Address,
          Ranking,
          Website_Link,
          Course_Name,
          Intakes,
          Duration,
          Campus,
          Course_Url,
          Yearly_Tuition_Fees,
          Application_Fees,
          Application_Deadline,
          PTE_Overall,
          PTE_No_Bands_Less_Than,
          TOEFL_iBT_Overall,
          TOEFL_iBT_no_Bands_Less_Than,
          IELTS_Overall,
          IELTS_no_Band_Less_Than,
          GRE_Score,
          GMAT_Score,
          ACT_Score,
          SAT_Score,
          DET_Score,
          GPA,
          Remarks,
        },
        { new: true }
      );
      res
        .status(201)
        .json({ message: "Object created successfully", newObject });
    }
  } catch (error) {
    console.error("Error creating or updating object:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteCourse(req, res, next) {
  const { _id } = req.body;
  try {
    const deletedObject = await Courses.findByIdAndDelete(_id);
    res
      .status(200)
      .json({ message: "Object deleted successfully", deletedObject });
  } catch (error) {
    console.error("Error creating or updating object:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function editCourse(req, res, next) {
  const {
    _id,
    Country,
    URL,
    Institute_Name,
    Institut_Logo,
    Full_Address,
    Ranking,
    Website_Link,
    Course_Name,
    Intakes,
    Duration,
    Campus,
    Course_Url,
    Yearly_Tuition_Fees,
    Application_Fees,
    Application_Deadline,
    PTE_Overall,
    PTE_No_Bands_Less_Than,
    TOEFL_iBT_Overall,
    TOEFL_iBT_no_Bands_Less_Than,
    IELTS_Overall,
    IELTS_no_Band_Less_Than,
    GRE_Score,
    GMAT_Score,
    ACT_Score,
    SAT_Score,
    DET_Score,
    GPA,
    Remarks,
  } = req.body;
  const objectId = _id;

  try {
    const updatedObject = await Courses.findByIdAndUpdate(
      objectId,
      {
        Country,
        URL,
        Institute_Name,
        Institut_Logo,
        Full_Address,
        Ranking,
        Website_Link,
        Course_Name,
        Intakes,
        Duration,
        Campus,
        Course_Url,
        Yearly_Tuition_Fees,
        Application_Fees,
        Application_Deadline,
        PTE_Overall,
        PTE_No_Bands_Less_Than,
        TOEFL_iBT_Overall,
        TOEFL_iBT_no_Bands_Less_Than,
        IELTS_Overall,
        IELTS_no_Band_Less_Than,
        GRE_Score,
        GMAT_Score,
        ACT_Score,
        SAT_Score,
        DET_Score,
        GPA,
        Remarks,
      },
      { new: true }
    );

    if (!updatedObject) {
      return res.status(404).json({ message: "Object not found" });
    }
    res
      .status(200)
      .json({ message: "Object updated successfully", updatedObject });
  } catch (error) {
    console.error("Error updating object:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function searchCourses(req, res, next) {
  var course = req.query.course;
  var university = req.query.university[0];

  var pipeline1 = [
    {
      $match: {
        $and: [{ Institute_Name: university }, { $text: { $search: course } }],
      },
    },
    {
      $addFields: {
        rankingNumeric: {
          $cond: {
            if: { $ne: ["$Ranking", ""] },
            then: {
              $toDouble: { $arrayElemAt: [{ $split: ["$Ranking", " "] }, 0] },
            },
            else: null,
          },
        },
      },
    },
    {
      $project: {
        score: { $meta: "textScore" },
        Full_Address: 1,
        Course_Name: 1,
        Institute_Name: 1,
        Duration: 1,
        Yearly_Tuition_Fees: 1,
        Ranking: 1,
        Institute_Logo: 1,
        Website_Link: 1,
        Country: 1,
        Application_Deadline: 1,
      },
    },
    { $sort: { score: -1 } },
  ];

  var pipeline2 = [
    {
      $match: { $text: { $search: course } },
    },
    {
      $addFields: {
        rankingNumeric: {
          $cond: {
            if: { $ne: ["$Ranking", ""] },
            then: {
              $toDouble: { $arrayElemAt: [{ $split: ["$Ranking", " "] }, 0] },
            },
            else: null,
          },
        },
      },
    },
    {
      $project: {
        score: { $meta: "textScore" },
        Full_Address: 1,
        Course_Name: 1,
        Institute_Name: 1,
        Duration: 1,
        Yearly_Tuition_Fees: 1,
        Ranking: 1,
        Institute_Logo: 1,
        Website_Link: 1,
        Country: 1,
        Application_Deadline: 1,
      },
    },
    { $sort: { score: -1 } },
  ];

  if (university.length && course.length) {
    const data = await Courses.aggregate(pipeline1).limit(500);
    res.send(data);
  } else if (university.length) {
    const data = await Courses.find({
      Institute_Name: university,
    }).limit(500);
    res.send(data);
  } else if (course.length) {
    const data = await Courses.aggregate(pipeline2).limit(500);
    res.send(data);
  }
}

async function similarCourses(course, institute, co) {
  const pipeline = [
    {
      $match: {
        $and: [{ $text: { $search: course } }, { _id: { $ne: co } }],
      },
    },
    {
      $project: {
        score: { $meta: "textScore" },
        Full_Address: 1,
        Course_Name: 1,
        Institute_Name: 1,
        Ranking: 1,
        Yearly_Tuition_Fees: 1,
        _id: 1,
        National_Ranking: 1,
        QS_Ranking: 1,
        World_Ranking: 1,
        Duration: 1,
      },
    },
    { $sort: { score: -1 } },
  ];

  const pipeline1 = [
    {
      $match: {
        $and: [
          { $text: { $search: course } },
          { Institute_Name: institute },
          { _id: { $ne: co } },
        ],
      },
    },
    {
      $project: {
        score: { $meta: "textScore" },
        Full_Address: 1,
        Course_Name: 1,
        Institute_Name: 1,
        Ranking: 1,
        Yearly_Tuition_Fees: 1,
        _id: 1,
        National_Ranking: 1,
        QS_Ranking: 1,
        World_Ranking: 1,
        Duration: 1,
      },
    },
    { $sort: { score: -1 } },
  ];
  try {
    const [courses] =await  Promise.all([Courses.aggregate(pipeline).limit(10)])
    return { courses: courses};
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

const courseRoutes = {
  courseData,
  allCourses,
  addCourse,
  deleteCourse,
  editCourse,
  searchCourses,
  similarCourses,
};

export default courseRoutes;
