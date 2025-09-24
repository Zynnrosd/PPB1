import { supabase } from "../config/supabaseClient.js";

export const ReportModel = {
  async getTotalMedications() {
    const { data, error } = await supabase
      .from("medications")
      .select("quantity");

    if (error) throw error;

    // Hitung total dari semua quantity
    const total = data.reduce((sum, item) => sum + (item.quantity || 0), 0);

    return { total };
  },
};
