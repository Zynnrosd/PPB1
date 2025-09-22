import { ReportModel } from "../models/reportModel.js";

export const ReportController = {
  async getTotal(req, res) {
    try {
      const result = await ReportModel.getTotalMedications();
      res.json(result); // { total: 123 }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
