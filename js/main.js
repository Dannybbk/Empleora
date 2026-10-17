// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Cargar últimos anuncios en la home
async function loadLatestAds() {
  const container = document.getElementById('latest-ads');
  if (!container) return;

  const { data, error } = await supabase
    .from('ads')
    .select('id, title, profession, city, province, description, created_at')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(6);

  if (error || !data || data.length === 0) {
    container.innerHTML = '<p>Aún no hay anuncios publicados.</p>';
    return;
  }

  container.innerHTML = data.map(ad => `
    <div class="ad-card">
      <h3>${ad.title}</h3>
      <div class="ad-meta">${ad.profession} • ${ad.city || ''} ${ad.province || ''}</div>
      <p class="ad-desc">${ad.description.substring(0, 120)}...</p>
      <a href="anuncio.html?id=${ad.id}" class="btn btn-outline">Ver anuncio</a>
    </div>
  `).join('');
}

loadLatestAds();
