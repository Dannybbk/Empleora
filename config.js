// Configuración de Supabase
// REEMPLAZA estas dos líneas con tus datos de Supabase (te explico cómo en el README)
const SUPABASE_URL = 'TU_SUPABASE_URL_AQUI';
const SUPABASE_ANON_KEY = 'TU_SUPABASE_ANON_KEY_AQUI';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
