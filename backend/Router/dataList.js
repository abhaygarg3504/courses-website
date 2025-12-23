import express from "express";
import Courses from "../Models/Course.js";
const router = express.Router();

router.get("/country", async (req, res, next) => {
  try {
    let country = await Courses.distinct("Full_Address");
    let name = [];
    country.map((elem) => {
      elem = elem.split(",");
      elem = elem[elem.length - 1];
      elem = elem.replace("\n", "");
      if (name.indexOf(elem) === -1 && elem.length > 1) name.push(elem);
    });
    res.status(200).send(name);
  } catch (error) {
    res.status(400).send("some error occurred");
  }
});

router.get("/university", async (req, res, next) => {
  try {
    let search = req.query.search;
    if (search === "United States") {
      search = "United States of America";
    }
    let University = await Courses.find({
      Country: search,
    }).distinct("Institute_Name");
    res.status(200).send(University);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get("/state", async (req, res, next) => {
  let words = req.query.q.replace("%20", " ");
  words = words.split(" ");
  if (words.length > 1) {
    const query = req.query.q.replaceAll(",", " ");
    const data = await Courses.aggregate([
      {
        $match: {
          $text: { $search: query },
        },
      },
      {
        $project: {
          Full_Address: 1,
          score: { $meta: "textScore" },
        },
      },
      {
        $group: {
          _id: "$Full_Address",
          score: { $first: "$score" },
          Full_Address: { $addToSet: "$Full_Address" }, // Collect unique elements within each group
        },
      },
    ]).limit(50);
    data.sort((a, b) => b.score - a.score);
    res.send(data);
  } else {
    const query = new RegExp("\\b" + req.query.q, "gi");
    const statelist = await Courses.aggregate([
      {
        $match: {
          $or: [
            {
              Full_Address: { $regex: query },
            },
            {
              Country: { $regex: query },
            },
          ],
        },
      },
      {
        $project: {
          Full_Address: 1,
        },
      },
      {
        $sort: {
          Full_Address: 1,
        },
      },
      {
        $group: {
          _id: "$Full_Address",
          Full_Address: { $addToSet: "$Full_Address" }, // Collect unique elements within each group
        },
      },
    ]).limit(50);
    res.send(statelist);
  }
});

router.get("/course", async (req, res, next) => {
  let words = req.query.q.replace("%20", " ");
  words = words.split(" ");
  if (words.length > 1) {
    const data = await Courses.aggregate([
      {
        $match: {
          $text: { $search: req.query.q },
        },
      },
      {
        $project: {
          Institute_Name: 1,
          score: { $meta: "textScore" },
        },
      },
      {
        $match: {
          Institute_Name: { $ne: "" },
        },
      },
      {
        $sort: {
          score: -1,
        },
      },
      {
        $group: {
          _id: "$Institute_Name",
          Institute_Name: { $addToSet: "$Institute_Name" }, // Collect unique elements within each group
        },
      },
    ]).limit(50);
    res.send(data);
  } else {
    const query = new RegExp("\\b" + req.query.q, "gi");
    const courseList = await Courses.aggregate([
      {
        $match: {
          Institute_Name: { $regex: query },
        },
      },
      {
        $project: {
          Institute_Name: 1,
        },
      },
      {
        $sort: {
          Institute_Name: 1,
        },
      },
      {
        $group: {
          _id: "$Institute_Name",
          course_id: { $first: "$_id" },
          Institute_Name: { $addToSet: "$Institute_Name" },
        },
      },
    ]).limit(50);
    res.send(courseList);
  }
});

router.get("/all/university", async (req, res, next) => {
  let words = req.query.q.replace("%20", " ");
  words = words.split(" ");
  if (words.length > 1) {
    const data = await Courses.aggregate([
      {
        $match: {
          $text: { $search: req.query.q },
        },
      },
      {
        $project: {
          Institute_Name: 1,
          score: { $meta: "textScore" },
        },
      },
      {
        $match: {
          Institute_Name: { $ne: "" },
        },
      },
      {
        $sort: {
          score: -1,
        },
      },
      {
        $group: {
          _id: "$Institute_Name",
          Institute_Name: { $addToSet: "$Institute_Name" }, // Collect unique elements within each group
        },
      },
    ]).limit(50);
    res.send(data);
  } else {
    const query = new RegExp("\\b" + req.query.q, "gi");
    const courseList = await Courses.aggregate([
      {
        $match: {
          Institute_Name: { $regex: query },
        },
      },
      {
        $project: {
          Institute_Name: 1,
        },
      },
      {
        $sort: {
          Institute_Name: 1,
        },
      },
      {
        $group: {
          _id: "$Institute_Name",
          course_id: { $first: "$_id" },
          Institute_Name: { $addToSet: "$Institute_Name" },
        },
      },
    ]).limit(50);
    res.send(courseList);
  }
});

export default router;
