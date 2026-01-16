const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Food", "Travel", "Shopping", "Bills", "Other"],
      required: true
    }
  },
  {
    timestamps: true // 👈 adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
