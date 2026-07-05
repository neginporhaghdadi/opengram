import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pnjygdcwvgiratwwvdxk.supabase.co";
const supabaseAnonKey = "sb_publishable_trqPZFji8L2b7FA12vf0iA_iI-9T-ot";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);