// Configuración global de Supabase para Empleora
const SUPABASE_URL = 'https://tu-proyecto.supabase.co'; // Reemplaza con tu URL real de Supabase si es distinta
const SUPABASE_ANON_KEY = 'tu-clave-anonima-publica'; // Reemplaza con tu Key anónima de Supabase

// Inicializar cliente global de Supabase
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
