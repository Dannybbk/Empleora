// Configuración de Supabase para Empleora
const SUPABASE_URL = 'https://ctkiiimazwpztekwfnrn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_xkq1LHED5KxRpR35NRciCw_Na00Hi87';

// Inicializar cliente global de Supabase de forma segura
if (window.supabase) {
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Close menu when clicking a link on mobile
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
      }
    });
  });
});
