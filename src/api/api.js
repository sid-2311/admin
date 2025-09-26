const apiBase = import.meta.env.VITE_BACKEND_URL || import.meta.env.NEXT_PUBLIC_BASE_URL || "";

function warnIfNoBase() {
    if (!apiBase) console.warn('apiBase is empty. Set VITE_BACKEND_URL or NEXT_PUBLIC_BASE_URL');
}



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





// export async function fetchServicesByCategorySlug(slug) {
//     warnIfNoBase();
//     if (!slug) return [];
//     try {
//         const res = await fetch(`${apiBase}/api/websitenew/category/${slug}/services`);
//         if (!res.ok) throw new Error(`Network response was not ok (${res.status})`);
//         const data = await res.json();
//         return data?.data || data || [];
//     } catch (err) {
//         console.error('Failed to fetch services for category', slug, err);
//         throw err;
//     }
// }

// export async function fetchServiceBySlug(slug, serviceType = 'website') {
//     warnIfNoBase();
//     if (!slug) return null;
//     try {
//         const res = await fetch(`${apiBase}/api/websitenew/service/${slug}?serviceType=${serviceType}`);
//         if (!res.ok) throw new Error(`Network response was not ok (${res.status})`);
//         const data = await res.json();
//         return data?.data || data || null;
//     } catch (err) {
//         console.error('Failed to fetch service by slug', slug, err);
//         throw err;
//     }
// }
