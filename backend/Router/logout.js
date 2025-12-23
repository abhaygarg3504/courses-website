import express from "express";
const router = express.Router();

router.get("/api/logout", function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(400).send("Internal Server error")
    } else {
      res.status(200).send("Successfully Logged out");
    }
  });
});

export default router;
