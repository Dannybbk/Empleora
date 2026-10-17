// Configuración centralizada de Supabase
const SUPABASE_URL = 'https://ctkiiimazwpztekwfnrn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xkq1LHED5KxRpR35NRciCw_Na00Hi87';

// Creamos un nombre de cliente único para evitar duplicidades
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
