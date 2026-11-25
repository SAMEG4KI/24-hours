// ตั้งค่า 2 ค่านี้จาก Supabase Project Settings > API
// ใช้ Project URL และ anon/public key เท่านั้น ห้ามใส่ service_role key ในเว็บไซต์
window.SUPABASE_URL = "ใส่_SUPABASE_PROJECT_URL";
window.SUPABASE_ANON_KEY = "ใส่_SUPABASE_ANON_PUBLIC_KEY";
window.getSupabase = function () {
  if (!window.supabase || !window.SUPABASE_URL.startsWith("https://") || window.SUPABASE_ANON_KEY.startsWith("ใส่_")) return null;
  return window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
};
