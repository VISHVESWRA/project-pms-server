import Policy from "../models/policy.model.js";

const getPolicyStatus = (startDate, endDate) => {
  const today = new Date();

  if (startDate && today < new Date(startDate)) return "upcoming";
  if (endDate && today > new Date(endDate)) return "expired";
  return "active";
};

// Create Policy
export const createPolicy = async (req, res) => {
  try {
    const status = getPolicyStatus(req.body.startDate, req.body.endDate);

    const policy = new Policy({
      ...req.body,
      status,
      appliedDocument: req.file
        ? `/uploads/policies/${req.file.filename}`
        : null,
    });

    await policy.save();
    res.status(201).json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Policies
export const getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find().sort({ startDate: -1 });

    const updatedPolicies = await Promise.all(
      policies.map(async (policy) => {
        const newStatus = getPolicyStatus(policy.startDate, policy.endDate);

        if (policy.status !== newStatus) {
          policy.status = newStatus;
          await policy.save();
        }
        return policy;
      })
    );

    res.json(updatedPolicies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single Policy
export const getPolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) return res.status(404).json({ message: "Policy not found" });
    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Policy
export const updatePolicy = async (req, res) => {
  try {
    const status = getPolicyStatus(req.body.startDate, req.body.endDate);

    const updateData = {
      ...req.body,
      status,
    };

    if (req.file) {
      updateData.appliedDocument = `/uploads/policies/${req.file.filename}`;
    }

    const policy = await Policy.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!policy) return res.status(404).json({ message: "Policy not found" });

    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Policy
export const deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndDelete(req.params.id);
    if (!policy) return res.status(404).json({ message: "Policy not found" });
    res.json({ message: "Policy deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
