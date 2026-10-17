document.addEventListener('DOMContentLoaded', async () => {
  // Cargar categorías
  const { data: cats } = await supabase.from('categories').select('*').order('name');
  const select = document.querySelector('select[name="category"]');
  if (cats) {
    cats.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      select.appendChild(opt);
    });
  }

  // Comprobar sesión
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    document.getElementById('message').innerHTML = 'Debes <a href="login.html">iniciar sesión</a> para publicar un anuncio.';
    document.getElementById('ad-form').style.display = 'none';
    return;
  }

  document.getElementById('ad-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      user_id: session.user.id,
      title: form.title.value,
      profession: form.profession.value,
      category_id: form.category.value,
      province: form.province.value,
      city: form.city.value,
      description: form.description.value,
      experience: form.experience.value,
      skills: form.skills.value,
      jornada: form.jornada.value,
      disponibilidad: form.disponibilidad.value,
      contact_method: form.contact_method.value,
      contact_info: form.contact_info.value,
      status: 'pending'
    };

    const { error } = await supabase.from('ads').insert([data]);
    const msg = document.getElementById('message');
    if (error) {
      msg.style.color = 'red';
      msg.textContent = 'Error: ' + error.message;
    } else {
      msg.style.color = 'green';
      msg.textContent = '¡Anuncio enviado! Será revisado antes de publicarse.';
      form.reset();
    }
  });
});
