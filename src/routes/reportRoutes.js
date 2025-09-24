import express from "express";
import { ReportController } from "../controllers/reportController.js";

const router = express.Router();

// GET /api/reports/total
router.get("/total", ReportController.getTotal);

export default router;
