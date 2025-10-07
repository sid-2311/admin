// New API for full WebsiteService update (edit page)
const apiBase = import.meta.env.VITE_BACKEND_URL || import.meta.env.NEXT_PUBLIC_BASE_URL || "";

export async function updateWebsiteService(slug, payload) {
  if (!slug || !payload) throw new Error('Missing slug or payload');
  try {
    const res = await fetch(`${apiBase}/api/websitenew/updatewebsitegeneralinfo/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`PUT failed (${res.status})`);
    return await res.json();
  } catch (err) {
    console.error('Failed to update WebsiteService', slug, err);
    throw err;
  }
}
