document.addEventListener('DOMContentLoaded', async () => {
  // Usamos de forma segura el cliente de Supabase disponible
  const clienteSupabase = window.supabaseClient || window.supabase;

  if (!clienteSupabase) {
    console.error("No se encontró el cliente de Supabase.");
    return;
  }

  // Comprobar sesión
  const { data: { session }, error: sessionError } = await clienteSupabase.auth.getSession();
  const msg = document.getElementById('message');
  const form = document.getElementById('ad-form');

  if (!session) {
    if (msg) msg.innerHTML = 'Debes <a href="login.html">iniciar sesión</a> para publicar un anuncio.';
    if (form) form.style.display = 'none';
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // EVITA QUE SE RECARGUE LA PÁGINA
    
    if (msg) {
      msg.style.color = '#666';
      msg.textContent = 'Enviando anuncio...';
    }

    const data = {
      user_id: session.user.id,
      title: form.title.value,
      profession: form.profession.value,
      category: form.category.value, // Coincide con el select de tu HTML
      province: form.province.value,
      city: form.city.value,
      description: form.description.value,
      experience: form.experience.value || '',
      skills: form.skills.value || '',
      jornada: form.jornada.value || '',
      disponibilidad: form.disponibilidad.value || '',
      contact_method: form.contact_method.value,
      contact_info: form.contact_info.value,
      status: 'pending'
    };

    const { error } = await clienteSupabase.from('ads').insert([data]);
    
    if (error) {
      console.error('Error de Supabase:', error);
      if (msg) {
        msg.style.color = 'red';
        msg.textContent = 'Error: ' + error.message;
      }
    } else {
      if (msg) {
        msg.style.color = 'green';
        msg.textContent = '¡Anuncio enviado! Será revisado antes de publicarse.';
      }
      form.reset();
    }
  });
});
