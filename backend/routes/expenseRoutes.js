const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Add expense
router.post("/", async (req, res) => {
  try {
    console.log("📥 Incoming body:", req.body);

    const expense = await Expense.create({
      title: req.body.title,
      amount: Number(req.body.amount),
      category: req.body.category
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error("❌ Expense create failed:", err.message);
    res.status(400).json({ error: err.message });
  }
});


// Get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Category-wise analytics
router.get("/analytics/category", async (req, res) => {
  try {
    const result = await Expense.aggregate([
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Monthly analytics
router.get("/analytics/monthly", async (req, res) => {
  try {
    const result = await Expense.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalAmount: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Budget alert
router.get("/analytics/budget-alert", async (req, res) => {
  try {
    const budget = 10000;

    const total = await Expense.aggregate([
      { $group: { _id: null, sum: { $sum: "$amount" } } }
    ]);

    const spent = total[0]?.sum || 0;

    res.json({
      spent,
      budget,
      exceeded: spent > budget
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete expense
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Update expense
router.put("/:id", async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
