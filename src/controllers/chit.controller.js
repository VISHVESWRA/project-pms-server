import Chit from "../models/chit.model.js";

const updateChitStatus = (chit) => {
  const today = new Date();

  if (today < chit.startDate) {
    chit.status = "upcoming";
  } else if (chit.paidMonths >= chit.duration) {
    chit.status = "closed";
    chit.closedDate = chit.closedDate || today;
  } else {
    chit.status = "active";
  }

  return chit;
};

export const createChit = async (req, res) => {
  try {
    console.log("RAW BODY:", req.body);

    const chitData = {
      chitName: req.body.chitName,
      groupName: req.body.groupName,

      totalAmount: Number(req.body.totalAmount),
      monthlyAmount: Number(req.body.monthlyAmount),
      duration: Number(req.body.duration),

      startDate: new Date(req.body.startDate),
    };

    console.log("SANITIZED DATA:", chitData);

    const chit = new Chit(chitData);
    await chit.save();

    res.status(201).json(chit);
  } catch (error) {
    console.error("CREATE CHIT ERROR:", error);
    res.status(400).json({ message: error.message });
  }
};
export const getChits = async (req, res) => {
  const chits = await Chit.find();

  const updated = await Promise.all(
    chits.map(async (chit) => {
      updateChitStatus(chit);
      await chit.save();

      return {
        ...chit.toObject(),
        progress: Math.round((chit.paidMonths / chit.duration) * 100),
        remainingMonths: chit.duration - chit.paidMonths,
      };
    })
  );

  console.log(updated);

  res.json(updated);
};

export const getChitById = async (req, res) => {
  const chit = await Chit.findById(req.params.id);
  res.json(chit);
};

export const updateChit = async (req, res) => {
  const chit = await Chit.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(chit);
};

export const deleteChit = async (req, res) => {
  await Chit.findByIdAndDelete(req.params.id);
  res.json({ message: "Chit deleted" });
};

export const payChit = async (req, res) => {
  const chit = await Chit.findById(req.params.id);
  if (!chit) return res.status(404).json({ message: "Chit not found" });

  if (chit.status !== "active")
    return res.status(400).json({ message: "Chit not active" });

  chit.paidMonths += 1;
  chit.lastPaidDate = new Date();

  updateChitStatus(chit);
  await chit.save();

  res.json({ message: "Monthly payment successful", chit });
};
