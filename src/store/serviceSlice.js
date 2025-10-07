import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchServiceByAnySlug, patchServiceBySlug, fetchAllServices, createService, deleteService, updateWebsiteService } from '../api/api';

const apiBase = import.meta.env.VITE_BACKEND_URL || import.meta.env.NEXT_PUBLIC_BASE_URL;



// Fetch WebsiteService by any slug (primary or secondary)
export const loadServiceByAnySlug = createAsyncThunk(
  'service/loadServiceByAnySlug',
  async (slug) => {
    const data = await fetchServiceByAnySlug(slug);
    return data;
  }
);


// Fetch all WebsiteServices 
export const fetchServices = createAsyncThunk(
  "service/fetchServices",
  async () => {
    return await fetchAllServices();
  }
);





// PATCH WebsiteService by slug 
export const patchService = createAsyncThunk(
  'service/patchService',
  async ({ slug, payload }) => {
    console.log("Patching service", slug, payload);
    
    const data = await patchServiceBySlug(slug, payload);
    return data;
  }
);



export const updateServiceThunk = createAsyncThunk(
  'websiteEdit/updateService',
  async ({ slug, payload }) => {
    return await updateWebsiteService(slug, payload);
  }
);


// Fetch all deleted WebsiteServices (soft deleted)
export const fetchDeletedServices = createAsyncThunk(
  "service/fetchDeletedServices",
  async () => {

    const res = await fetch(`${apiBase}/api/websitenew/services/deleted`);
    const data = await res.json();
    console.log("Deleted Services Response:", data);

    if (!res.ok) throw new Error(`Failed to fetch deleted services (${res.status})`);
    return await data;
  }
);


// 🟢 Create new service
export const addService = createAsyncThunk(
  "services/create",
  async (payload) => {
    return await createService(payload);
  }
);

// 🟢 Delete service
export const removeService = createAsyncThunk(
  "services/delete",
  async (slug) => {
    return await deleteService(slug);
  }
);






const serviceSlice = createSlice({
  name: 'service',
  initialState: { loading: false, list: [], selected: null, error: null },
  extraReducers: (builder) => {
    builder

      // Add case for loadServiceByAnySlug
      .addCase(loadServiceByAnySlug.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loadServiceByAnySlug.fulfilled, (state, action) => { state.loading = false; state.selected = action.payload; })
      .addCase(loadServiceByAnySlug.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      // PATCH WebsiteService
      .addCase(patchService.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(patchService.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(patchService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch all services 

      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update service (used in website edit) 
      .addCase(updateServiceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateServiceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(updateServiceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      // Add to extraReducers for fetchDeletedServices thunk
      .addCase(fetchDeletedServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeletedServices.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchDeletedServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })



      // Create
      .addCase(addService.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Delete
      .addCase(removeService.fulfilled, (state, action) => {
        const deletedSlug = action.meta.arg;
        state.list = state.list.filter((srv) => srv.slug !== deletedSlug);
        if (state.selected?.slug === deletedSlug) {
          state.selected = null;
        }
      });

  }
});

export default serviceSlice.reducer;
