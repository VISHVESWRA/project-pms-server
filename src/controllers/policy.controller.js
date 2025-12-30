import Policy from "../models/policy.model.js";

// Create Policy
export const createPolicy = async (req, res) => {
  try {
    const policy = new Policy(req.body);
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
    res.json(policies);
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
    const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, {
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
