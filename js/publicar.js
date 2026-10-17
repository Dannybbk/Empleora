document.addEventListener('DOMContentLoaded', async () => {
  const clienteSupabase = window.supabaseClient || window.supabase;

  if (!clienteSupabase) {
    console.error("Error crítico: No se encontró Supabase.");
    return;
  }

  // Comprobar sesión
  const { data: { session }, error: sessionError } = await clienteSupabase.auth.getSession();
  const msg = document.getElementById('message');
  const form = document.getElementById('ad-form');

  if (!session) {
    if (msg) {
      msg.style.color = 'red';
      msg.innerHTML = 'Debes <a href="login.html">iniciar sesión</a> para publicar un anuncio.';
    }
    if (form) form.style.display = 'none';
    return;
  }

  // Escuchar el envío del formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // ESTO FRENARÁ LA RECARGA DE LA PÁGINA

    if (msg) {
      msg.style.color = '#666';
      msg.textContent = 'Enviando anuncio a Supabase...';
    }

    const data = {
      user_id: session.user.id,
      title: form.title.value,
      profession: form.profession.value,
      category: form.category.value,
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
        msg.textContent = 'Error al guardar: ' + error.message;
      }
    } else {
      if (msg) {
        msg.style.color = 'green';
        msg.textContent = '¡Anuncio enviado con éxito! En breve aparecerá activo tras ser revisado.';
      }
      form.reset(); // Limpia los campos solo cuando se guarda con éxito
    }
  });
});
