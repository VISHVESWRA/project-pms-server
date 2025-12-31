import Loan from "../models/loan.model.js";

export const createLoan = async (req, res) => {
  const loan = await Loan.create(req.body);
  res.status(201).json(loan);
};

export const getLoans = async (req, res) => {
  const loans = await Loan.find().sort({ createdAt: -1 });
  res.json(loans);
};

export const getLoanById = async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  res.json(loan);
};

export const updateLoan = async (req, res) => {
  const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(loan);
};

export const deleteLoan = async (req, res) => {
  await Loan.findByIdAndDelete(req.params.id);
  res.json({ message: "Loan deleted" });
};
