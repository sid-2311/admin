import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const apiBase = import.meta.env.VITE_BACKEND_URL || import.meta.env.NEXT_PUBLIC_BASE_URL || "";

function warnIfNoBase() {
    if (!apiBase) console.warn('apiBase is empty. Set VITE_BACKEND_URL or NEXT_PUBLIC_BASE_URL');
}

async function fetchNavbarData() {
    warnIfNoBase();
    try {
        const res = await fetch(`${apiBase}/api/navbar/`);
        if (!res.ok) throw new Error(`Network response was not ok (${res.status})`);
        const data = await res.json();
        return Array.isArray(data) ? data.sort((a, b) => (a.index || 0) - (b.index || 0)) : [];
    } catch (err) {
        console.error('Failed to fetch navbar:', err);
        throw err;
    }
}

export const loadNavbars = createAsyncThunk('navbar/loadNavbars', async () => {
  const data = await fetchNavbarData();
  return data;
});

const navbarSlice = createSlice({
  name: 'navbar',
  initialState: { loading: false, data: [], error: null },
  extraReducers: (builder) => {
    builder
      .addCase(loadNavbars.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(loadNavbars.fulfilled, (state, action) => {
        state.loading = false; state.data = action.payload; state.error = null;
      })
      .addCase(loadNavbars.rejected, (state, action) => {
        state.loading = false; state.error = action.error.message;
      });
  },
});

export default navbarSlice.reducer;

