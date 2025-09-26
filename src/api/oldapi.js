const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const OldfetchNavbarData = async () => {
    try {
        const res = await fetch(`${baseUrl}/api/navbar/`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        // Sort categories by index if needed
        return data.sort((a, b) => a.index - b.index);
    } catch (err) {
        console.error("Failed to fetch navbar:", err);
        return [];
    }
};