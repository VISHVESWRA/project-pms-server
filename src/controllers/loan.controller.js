import Loan from "../models/loan.model.js";

/* ---------- HELPERS ---------- */
const calculateLoanMetrics = (loan) => {
  const totalPaid = loan.paidEmis * loan.emiAmount;
  const remainingBalance = Math.max(loan.loanAmount - totalPaid, 0);
  const progress = Math.min((totalPaid / loan.loanAmount) * 100, 100);

  return {
    totalPaid,
    remainingBalance,
    progress: Math.round(progress),
  };
};

/* ---------- STATUS CALCULATOR ---------- */
const getLoanStatus = (startDate, endDate) => {
  const today = new Date();

  if (startDate && today < new Date(startDate)) return "upcoming";
  if (endDate && today > new Date(endDate)) return "closed";
  return "active";
};

/* ---------- CREATE LOAN ---------- */
export const createLoan = async (req, res) => {
  try {
    const status = getLoanStatus(req.body.startDate, req.body.endDate);

    const loan = new Loan({
      ...req.body,
      status,
    });

    await loan.save();
    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------- GET ALL LOANS ---------- */
export const getLoans = async (req, res) => {
  try {
    const loans = await Loan.find().sort({ startDate: -1 });

    const enrichedLoans = loans.map((loan) => {
      const metrics = calculateLoanMetrics(loan);

      return {
        ...loan.toObject(),
        ...metrics,
      };
    });

    res.json(enrichedLoans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------- GET SINGLE LOAN ---------- */
export const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });
    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------- UPDATE LOAN ---------- */
export const updateLoan = async (req, res) => {
  try {
    const status = getLoanStatus(req.body.startDate, req.body.endDate);

    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { ...req.body, status },
      { new: true }
    );

    if (!loan) return res.status(404).json({ message: "Loan not found" });
    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------- DELETE LOAN ---------- */
export const deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });
    res.json({ message: "Loan deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const payEmi = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    if (loan.paidEmis >= loan.tenure) {
      return res.status(400).json({ message: "Loan already completed" });
    }

    loan.paidEmis += 1;

    if (loan.paidEmis === loan.tenure) {
      loan.status = "closed";
    }

    await loan.save();

    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
