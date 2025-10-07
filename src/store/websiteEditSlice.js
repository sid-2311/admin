import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateWebsiteService } from '../api/api';

export const updateServiceThunk = createAsyncThunk(
  'websiteEdit/updateService',
  async ({ slug, payload }) => {
    return await updateWebsiteService(slug, payload);
  }
);

const websiteEditSlice = createSlice({
  name: 'websiteEdit',
  initialState: { loading: false, updated: null, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(updateServiceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateServiceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.updated = action.payload;
      })
      .addCase(updateServiceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default websiteEditSlice.reducer;
