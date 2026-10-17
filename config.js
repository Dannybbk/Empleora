// Configuración limpia de Supabase para evitar duplicidades
const SUPABASE_URL = 'https://ctkiiimazwpztekwfnrn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xkq1LHED5KxRpR35NRciCw_Na00Hi87';

// Creamos un cliente único asignado a la ventana del navegador
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
