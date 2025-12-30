import Income from "../models/income.model.js";

/**
 * @desc Create income
 * @route POST /api/income
 */
export const createIncome = async (req, res) => {
  try {
    console.log("create");

    const income = await Income.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json(income);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @desc Get all incomes (logged-in user)
 * @route GET /api/income
 */
export const getIncomeList = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Update income
 * @route PUT /api/income/:id
 */
export const updateIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.json(income);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @desc Delete income
 * @route DELETE /api/income/:id
 */
export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
