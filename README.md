# EMPLEORA - Instrucciones completas para publicar la web (0 €)

## Paso 1: Crear cuenta en Supabase (base de datos gratuita)

1. Ve a https://supabase.com y crea una cuenta gratuita.
2. Crea un **nuevo proyecto** (elige una contraseña segura para la base de datos).
3. Espera a que se cree (1-2 minutos).
4. Ve a **SQL Editor** → New query.
5. Copia todo el contenido del archivo `supabase-schema.sql` y ejecútalo (Run).
6. Ve a **Settings → API**.
   - Copia la **Project URL**
   - Copia la **anon public key**
7. Abre el archivo `js/config.js` y reemplaza:
   ```js
   const SUPABASE_URL = 'pega_aqui_la_URL';
   const SUPABASE_ANON_KEY = 'pega_aqui_la_anon_key';
   ```

## Paso 2: Hacerte administrador

1. En Supabase ve a **Authentication → Users**.
2. Regístrate tú primero en la web (o créate un usuario desde el panel).
3. Copia tu **User UID**.
4. Ve a **Table Editor → profiles**.
5. Busca tu usuario y cambia `is_admin` a `true`.

## Paso 3: Subir la web a Internet (Cloudflare Pages - gratis)

1. Crea una cuenta gratuita en https://github.com
2. Crea un nuevo repositorio (público o privado).
3. Sube toda la carpeta `empleora` al repositorio (puedes arrastrar los archivos o usar GitHub Desktop).
4. Crea una cuenta en https://pages.cloudflare.com
5. Conecta tu cuenta de GitHub.
6. Selecciona el repositorio de Empleora.
7. Build settings:
   - Framework preset: **None**
   - Build command: (déjalo vacío)
   - Build output directory: `/` o déjalo vacío
8. Haz Deploy.

En unos minutos tendrás una URL tipo: `https://empleora.pages.dev`

## Paso 4: Que aparezca en Google

1. Ve a https://search.google.com/search-console
2. Añade tu propiedad (la URL de Cloudflare).
3. Verifica la propiedad (método HTML o DNS).
4. Ve a **Sitemaps** y envía: `https://tu-url.pages.dev/sitemap.xml`  
   (crea un archivo `sitemap.xml` simple con las páginas principales si quieres acelerar la indexación).
5. Solicita indexación de la página de inicio.

Google puede tardar días o semanas en indexar una web nueva.

## Paso 5: Usar la web

- Cualquier persona puede registrarse y publicar anuncios.
- Los anuncios quedan en estado `pending` hasta que tú los apruebes en `admin.html`.
- Entra en `https://tu-url.pages.dev/admin.html` (debes estar logueado como admin).

## Notas importantes

- El plan gratuito de Supabase pausa el proyecto si no hay actividad durante 7 días. Entra de vez en cuando o actualiza.
- Revisa las páginas legales con un profesional antes de promocionar mucho la web.
- No subas nunca la `service_role` key al código (solo la anon key).

¡Listo! Con estos pasos la web estará publicada, funcional y tú serás el administrador.
