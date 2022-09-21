const User = require("../models/users");
const Cost = require("../models/cost");
const express = require("express");
const { check, validationResult } = require("express-validator");
const checkObjectId = require("../utils/checkObjectId");
const router = express.Router();

router.post(
  "/newCost",
  check("user").notEmpty(),
  check("category").notEmpty(),
  check("amount").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ _id: req.body.user });

      const newCost = new Cost({
        user: req.body.user,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount,
        date: req.body.date,
      });

      const result = await newCost.save();
      user.updateTotalCost();
      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post("/delete", async (req, res) => {
  try {
    const { ids, userid } = req.body;
    const user = await User.findOne({ _id: userid });
    await Cost.deleteMany({
      _id: { $in: ids },
    });
    user.updateTotalCost();
    res.send({ msg: "deleted selected cost/costs" });
  } catch (e) {
    res.status(500).send("Server Error");
  }
});

router.get("/getSpesificCost/:id", checkObjectId("id"), async (req, res) => {
  try {
    const cost = await Cost.findById(req.params.id);

    if (!cost) {
      return res.status(404).json({ msg: "Cost not found" });
    }

    res.json(cost);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

router.get("/getcostsbymonthandyear/", async (req, res) => {
  try {
    checkObjectId(req.query.userId);
    const cost = await Cost.find({ user: req.query.userId });

    if (!cost) {
      return res.status(404).json({ msg: "Cost not found" });
    }
    if (req.query.date) {
      const date = new Date(req.query.date);
      const filteredCost = cost.filter((cost) => {
        return (
          cost.date.getMonth() === date.getMonth() &&
          cost.date.getFullYear() === date.getFullYear()
        );
      });
      res.json(filteredCost);
    } else {
      return res
        .status(404)
        .json({ msg: "no month and year were given or no costs found" });
    }
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
