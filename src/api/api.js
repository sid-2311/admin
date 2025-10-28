const apiBase = import.meta.env.VITE_BACKEND_URL || import.meta.env.NEXT_PUBLIC_BASE_URL || "";

function warnIfNoBase() {
    if (!apiBase) console.warn('apiBase is empty. Set VITE_BACKEND_URL or NEXT_PUBLIC_BASE_URL');
}


// Get WebsiteService by slug

export async function fetchServiceByAnySlug(slug) {
    warnIfNoBase();
    if (!slug) return null;
    try {
        const res = await fetch(`${apiBase}/api/websitenew/service/by-slug/${slug}`);
        if (!res.ok) throw new Error(`Network response was not ok (${res.status})`);
        const data = await res.json();
        return data?.data || null;
    } catch (err) {
        console.error('Failed to fetch service by any slug', slug, err);
        throw err;
    }
}

// Get all WebsiteServices (with populated category/subcategory)
export async function fetchAllServices() {
  warnIfNoBase();
  try {
    const res = await fetch(`${apiBase}/api/websitenew/services`);
    if (!res.ok) throw new Error(`Failed to fetch services (${res.status})`);
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch all services", err);
    throw err;
  }
}



// PATCH WebsiteService by slug
export async function patchServiceBySlug(slug, payload) {
    warnIfNoBase();
    if (!slug || !payload) throw new Error('Missing slug or payload');
    try {
        const res = await fetch(`${apiBase}/api/websitenew/service/${slug}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`PATCH failed (${res.status})`);
        return await res.json();
    } catch (err) {
        console.error('Failed to PATCH service', slug, err);
        throw err;
    }
}


// New API for  WebsiteService  General fields update (edit page)
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




// 🟢 Check if Slug Exists
// Returns true if exists, false otherwise
export async function checkSlugExists(slug) {
  warnIfNoBase();
  if (!slug) return false;
  try {
    const res = await fetch(`${apiBase}/api/websitenew/service/check-slug/${slug}`);
    if (!res.ok) throw new Error("Failed to check slug");
    const data = await res.json();
    return data.exists;
  } catch (err) {
    console.error("Slug check failed", err);
    return false;
  }
}







export async function createService(payload) {
  warnIfNoBase();
  const res = await fetch(`${apiBase}/api/websitenew/createnewservice`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create service");
  return await res.json();
}







// 🟢 Delete Service by Slug
export async function deleteService(slug) {
  try {
    const res = await fetch(`${apiBase}/api/websitenew/delete/${slug}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Failed to delete service (${res.status})`);
    return await res.json();
  } catch (err) {
    console.error("❌ Failed to delete service", err);
    throw err;
  }
}
