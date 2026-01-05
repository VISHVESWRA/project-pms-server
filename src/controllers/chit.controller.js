import Chit from "../models/chit.model.js";

/* ==========================
   STATUS CALCULATOR (PURE)
========================== */
const getStatus = (chit) => {
  const today = new Date();

  if (today < chit.startDate) return "upcoming";
  if (chit.paidMonths >= chit.duration) return "closed";
  return "active";
};

/* ==========================
   CREATE
========================== */
export const createChit = async (req, res) => {
  try {
    const chit = new Chit({
      chitName: req.body.chitName,
      groupName: req.body.groupName,
      totalAmount: Number(req.body.totalAmount),
      monthlyAmount: Number(req.body.monthlyAmount),
      duration: Number(req.body.duration),
      startDate: new Date(req.body.startDate),
    });

    await chit.save();
    res.status(201).json(chit);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(400).json({ message: err.message });
  }
};

/* ==========================
   GET ALL (FIXED)
========================== */
export const getChits = async (req, res) => {
  console.log("gets");

  try {
    const chits = await Chit.find().sort({ createdAt: -1 });

    const result = chits.map((chit) => {
      const duration = chit.duration || 1; // 🛡 SAFETY
      const paid = chit.paidMonths || 0;

      return {
        ...chit.toObject(),
        status: getStatus(chit),
        progress: Math.round((paid / duration) * 100),
        remainingMonths: Math.max(duration - paid, 0),
      };
    });

    res.json(result);
  } catch (err) {
    console.error("GET CHITS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch chits" });
  }
};

/* ==========================
   GET ONE
========================== */
export const getChitById = async (req, res) => {
  const chit = await Chit.findById(req.params.id);
  res.json(chit);
};

/* ==========================
   UPDATE
========================== */
export const updateChit = async (req, res) => {
  console.log("updateChit");

  const chit = await Chit.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.json(chit);
};

/* ==========================
   DELETE
========================== */
export const deleteChit = async (req, res) => {
  await Chit.findByIdAndDelete(req.params.id);
  res.json({ message: "Chit deleted" });
};

/* ==========================
   PAY
========================== */
export const payChit = async (req, res) => {
  const chit = await Chit.findById(req.params.id);

  if (!chit) return res.status(404).json({ message: "Chit not found" });
  if (getStatus(chit) !== "active")
    return res.status(400).json({ message: "Chit not active" });

  chit.paidMonths += 1;
  chit.lastPaidDate = new Date();

  if (chit.paidMonths >= chit.duration) {
    chit.status = "closed";
    chit.closedDate = new Date();
  } else {
    chit.status = "active";
  }

  await chit.save();
  res.json(chit);
};
