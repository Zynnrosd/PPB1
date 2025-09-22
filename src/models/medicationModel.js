import { supabase } from "../config/supabaseClient.js";

export const MedicationModel = {
  async getAll({ name, page, limit } = {}) {
    try {
      const _page = page ? parseInt(page, 10) : 1;
      const _limit = limit ? parseInt(limit, 10) : 10;
      const from = (_page - 1) * _limit;
      const to = from + _limit - 1;

      let query = supabase
        .from("medications")
        .select(
          `id, sku, name, description, price, quantity,
           categories(id, name),
           suppliers(id, name, email, phone)`,
          { count: "exact" }
        );

      if (name && name.trim() !== "") {
        query = query.ilike("name", `%${name.trim()}%`);
      }

      const { data, error, count } = await query.range(from, to);
      if (error) throw error;

      return {
        data: data || [],
        total: count || 0,
        page: _page,
        limit: _limit
      };
    } catch (err) {
      throw err;
    }
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("medications")
      .select(`
        id, sku, name, description, price, quantity,
        categories ( id, name ),
        suppliers ( id, name, email, phone )
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase
      .from("medications")
      .insert([payload])
      .select();

    if (error) throw error;
    return data[0];
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from("medications")
      .update(payload)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  async remove(id) {
    const { error } = await supabase.from("medications").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  }
};
