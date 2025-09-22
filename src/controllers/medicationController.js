import { MedicationModel } from "../models/medicationModel.js";

export const MedicationController = {
  async getAll(req, res) {
    try {
      const meds = await MedicationModel.getAll();
      res.json(meds);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const med = await MedicationModel.getById(req.params.id);
      res.json(med);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

    async create(req, res) {
    try {
      const { quantity, price } = req.body;
      let errors = [];

      if (quantity == null || quantity === "" || isNaN(quantity)) {
        errors.push("Quantity must be a valid number");
      }
      if (price == null || price === "" || isNaN(price)) {
        errors.push("Price must be a valid number");
      }

      if (quantity < 0) {
        errors.push("Quantity cannot be less than 0");
      }
      if (price < 0) {
        errors.push("Price cannot be less than 0");
      }

      if (errors.length > 0) {
        return res.status(400).json({ error: errors.join(", ") });
      }

      const med = await MedicationModel.create(req.body);
      res.status(201).json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { quantity, price } = req.body;
      let errors = [];

      if (quantity == null || quantity === "" || isNaN(quantity)) {
        errors.push("Quantity must be a valid number");
      }
      if (price == null || price === "" || isNaN(price)) {
        errors.push("Price must be a valid number");
      }

      if (quantity < 0) {
        errors.push("Quantity cannot be less than 0");
      }
      if (price < 0) {
        errors.push("Price cannot be less than 0");
      }

      if (errors.length > 0) {
        return res.status(400).json({ error: errors.join(", ") });
      }

      const med = await MedicationModel.update(req.params.id, req.body);
      res.json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

   async remove(req, res) {
    try {
      await MedicationModel.remove(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
