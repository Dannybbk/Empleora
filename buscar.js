// Configuración de Supabase integrada directamente
const SUPABASE_URL = 'https://ctkiiimazwpztekwfnrn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_xkq1LHED5KxRpR35NRciCw_Na00Hi87';

// Inicializar cliente localmente en este archivo
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadCategories() {
  const { data } = await supabaseClient.from('categories').select('*').order('name');
  const select = document.querySelector('select[name="categoria"]');
  if (select && data) {
    data.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      select.appendChild(opt);
    });
  }
}

async function searchAds(params = {}) {
  let query = supabaseClient.from('ads')
    .select('id, title, profession, city, province, description, created_at, categories(name)')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(50);

  if (params.profesion) query = query.ilike('profession', `%${params.profesion}%`);
  if (params.localidad) query = query.or(`city.ilike.%${params.localidad}%,province.ilike.%${params.localidad}%`);
  if (params.categoria) query = query.eq('category_id', params.categoria);

  const { data, error } = await query;
  const container = document.getElementById('results');
  const noResults = document.getElementById('no-results');
  if (container) container.innerHTML = '';

  if (!data || data.length === 0) {
    if (noResults) noResults.style.display = 'block';
    return;
  }
  if (noResults) noResults.style.display = 'none';

  data.forEach(ad => {
    const card = document.createElement('div');
    card.className = 'ad-card';
    card.innerHTML = `
      <h3>${ad.title}</h3>
      <div class="ad-meta">${ad.profession} • ${ad.city || ad.province} • ${new Date(ad.created_at).toLocaleDateString('es-ES')}</div>
      <p class="ad-desc">${ad.description ? ad.description.substring(0, 140) : ''}...</p>
      <a href="anuncio.html?id=${ad.id}" class="btn btn-outline">Ver anuncio</a>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadCategories();
  await searchAds();

  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      await searchAds({
        profesion: form.profesion.value,
        localidad: form.localidad.value,
        categoria: form.categoria.value
      });
    });
  }
});
