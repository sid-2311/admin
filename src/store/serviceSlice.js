import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchServicesByCategorySlug, fetchServiceBySlug  } from '../api/api';
import { fetchServiceByAnySlug } from '../api/api';


export const loadServiceByAnySlug = createAsyncThunk(
  'service/loadServiceByAnySlug',
  async (slug) => {
    const data = await fetchServiceByAnySlug(slug);
    return data;
  }
);








// // Add .addCase for loadServiceByAnySlug in extraReducers (same as loadServiceBySlug)
// export const loadServicesByCategory = createAsyncThunk(
//   'service/loadServicesByCategory',
//   async (categorySlug) => {
//     const data = await fetchServicesByCategorySlug(categorySlug);
//     return data;
//   }
// );

// export const loadServiceBySlug = createAsyncThunk(
//   'service/loadServiceBySlug',
//   async ({ slug, serviceType = 'website' }) => {
//     const data = await fetchServiceBySlug(slug, serviceType);
//     return data;
//   }
// );


const serviceSlice = createSlice({
  name: 'service',
  initialState: { loading: false, list: [], selected: null, error: null },
  extraReducers: (builder) => {
    builder
      // .addCase(loadServicesByCategory.pending, (state) => { state.loading = true; state.error = null; })
      // .addCase(loadServicesByCategory.fulfilled, (state, action) => { state.loading = false; state.list = action.payload || []; })
      // .addCase(loadServicesByCategory.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      // .addCase(loadServiceBySlug.pending, (state) => { state.loading = true; state.error = null; })
      // .addCase(loadServiceBySlug.fulfilled, (state, action) => { state.loading = false; state.selected = action.payload; })
      // .addCase(loadServiceBySlug.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })




      // Add case for loadServiceByAnySlug
      .addCase(loadServiceByAnySlug.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loadServiceByAnySlug.fulfilled, (state, action) => { state.loading = false; state.selected = action.payload; })
      .addCase(loadServiceByAnySlug.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  }
});

export default serviceSlice.reducer;
