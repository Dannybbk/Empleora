document.addEventListener('DOMContentLoaded', async () => {
  // Usamos el cliente único configurado en el paso anterior
  const supabase = window.supabaseClient;

  if (!supabase) {
    console.error("Error: Supabase no está inicializado.");
    return;
  }

  // Comprobar sesión
  const { data: { session } } = await supabase.auth.getSession();
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

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    if (msg) {
      msg.style.color = '#666';
      msg.textContent = 'Enviando anuncio...';
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

    const { error } = await supabase.from('ads').insert([data]);
    
    if (error) {
      if (msg) {
        msg.style.color = 'red';
        msg.textContent = 'Error: ' + error.message;
      }
    } else {
      if (msg) {
        msg.style.color = 'green';
        msg.textContent = '¡Anuncio enviado con éxito! Será revisado antes de publicarse.';
      }
      form.reset();
    }
  });
});
