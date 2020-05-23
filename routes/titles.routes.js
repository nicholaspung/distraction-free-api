const express = require("express");
const router = express.Router();

router.post("/titles", async (req, res) => {
  const { user, title } = req.body;
  await db("titles").insert({ user: user, title: title });
  await db("titles").then((titles) => console.log("titles", titles));
  res.status(201).json({ message: "Title added to your list." });
});
